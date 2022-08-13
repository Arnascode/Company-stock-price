/* eslint-disable react-hooks/exhaustive-deps */
// import Card from '../components/Card/Card';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Chart } from 'react-google-charts';

import './HomePage.scss';
import { baseUrl, myFetch, myFetchAuth } from '../../utils';
import Button from '../../components/UI/Button/Button';
import Icon from '../../components/UI/Icon/Icon';

function HomePage() {
  const [symbol, setSymbol] = useState([]);
  const [startime, setStartime] = useState([]);
  const [endtime, setEndtime] = useState([]);
  const initValues = {
    symbol: '',
    startime: '',
    endtime: '',
  };

  const [company, setCompany] = useState([]);
  const [stock, setStock] = useState([]);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      startime: Yup.date().required('Start date is required!'),
      endtime: Yup.date().required('End date is required!'),
      symbol: Yup.string()
        .min(1, 'At least 1 characters')
        .max(35)
        .required('Required!')
        .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
    }),
    onSubmit: async (values) => {
      const valuesCopy = { ...values };
      const unixTimestampS = Math.floor(new Date(valuesCopy.startime).getTime() / 1000);
      const unixTimestampE = Math.floor(new Date(valuesCopy.endtime).getTime() / 1000);
      setStartime(unixTimestampS);
      setEndtime(unixTimestampE);
      setSymbol(valuesCopy.symbol);

      const findCompany = await myFetchAuth(`${baseUrl}/company/${valuesCopy.symbol}`);
      console.log('findCompany ===', findCompany);
      if (findCompany.marketCapitalization > 0) {
        setCompany(findCompany);
      }
      if (findCompany.marketCapitalization > 0) {
        toast.success('There is the Company');
      }
      if (findCompany.country === undefined) {
        toast.error('there is no company with that symbol');
      }
    },
  });
  useEffect(() => {
    setCompany({});
  }, []);
  console.log(company, '=== posts');
  async function getStock() {
    const findStock = await myFetch(`${baseUrl}/company/${symbol}/${startime}/${endtime}`);
    setStock(findStock);
    console.log('fndstock ===', findStock);
  }
  console.log('stock ===', stock);

  function rightClassesForInput(field) {
    let resultClasses = 'form-control';
    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? ' is-invalid' : ' is-valid';
    }
    return resultClasses;
  }
  useEffect(() => {
    setStock({});
  }, [company]);

  console.log('posts ===', stock);

  // stock
  const stockToData = Object.values(stock);

  function del() {
    stockToData.splice(4, 1).map((t) => t[0]);
    console.log('companyToData ===', stockToData);

    return stockToData;
  }
  del();
  const dataSwitch = stockToData.map((t) => t[0]);
  console.log(dataSwitch, '=== dataSwitch ===');

  const data = [
    ['day', 'a', 'b', 'c', 'd'],
    ['Mon', 20, 28, 38, 45],
    ['Tue', 31, 38, 55, 66],
    ['Wed', 50, 55, 77, 80],
    ['Thu', 50, 77, 66, 77],
    ['Fri', 15, 66, 22, 68],
  ];
  console.log('data need to look like ===', data);
  // open
  //high
  //low prices
  //close
  // volume data
  // time days
  const options = {
    // Allow multiple
    // simultaneous selections.
    selectionMode: 'multiple',
    // Trigger tooltips
    // on selections.
    tooltip: { trigger: 'selection' },
    // Group selections
    // by x-value.
    aggregationTarget: 'category',
  };

  return (
    <div className={'home'}>
      <h1 className='text-center'>Welcome to Finhub API Companys Stock Price</h1>
      <form onSubmit={formik.handleSubmit} className={'container'}>
        <div className='form-group'>
          <div className='invalid-feedback'>{formik.errors.symbol}</div>
          <label htmlFor='symbol'>Company Symbol: </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.symbol}
            type='tytle'
            className={rightClassesForInput('symbol')}
            id='symbol'
            name='symbol'
          />
        </div>
        <div className='form-group'>
          <div className='invalid-feedback'>{formik.errors.startime}</div>
          <label htmlFor='startime'>Start time: </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.startime}
            type='date'
            className={rightClassesForInput('startime')}
            id='startime'
            name='startime'
          />
        </div>
        <div className='form-group'>
          <div className='invalid-feedback'>{formik.errors.endtime}</div>
          <label htmlFor='endtime'>End time: </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.endtime}
            type='date'
            className={rightClassesForInput('endtime')}
            id='andtime'
            name='endtime'
          />
        </div>
        <Button secondary submit>
          Search
        </Button>
      </form>
      <div className='firstCont'>
        <h3 onClick={getStock}>
          {company.name} <Icon icon='fa fa-building' />
        </h3>
        <h3>
          {company.country}
          <Icon icon='fa fa-globe' />
        </h3>
        <h3>
          {company.currency}
          <Icon icon='fa fa-money ' />
        </h3>
        <a href={company.weburl}>
          {company.weburl}
          <Icon icon='fa fa-paper-plane' />
        </a>
      </div>

      <div className='chart'>
        <h2>{dataSwitch}</h2>
        <h2>{stockToData}</h2>
        {/* <h2>{stock.h}</h2>
        <h2>{stock.l}</h2>
        <h2>{stock.v}</h2>
        <h2>{stock.t}</h2>
        <h2>{stock.s}</h2> */}
        {/* <Chart chartType='CandlestickChart' width='100%' height='400px' data={dataO} options={options} /> */}
      </div>
    </div>
  );
}

export default HomePage;
