import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Chart } from 'react-google-charts';
import './HomePage.scss';
import { baseUrl, myFetch, myFetchSym } from '../../utils';
import Button from '../../components/UI/Button/Button';
import Icon from '../../components/UI/Icon/Icon';
import { refreshPage } from '../../components/Header/Header';

function HomePage() {
  const [symbol, setSymbol] = useState([]);
  const [startime, setStartime] = useState([]);
  const [endtime, setEndtime] = useState([]);
  const initValues = {
    symbol: '',
    startime: '',
    endtime: '',
  };
  const [stock, setStock] = useState([]);
  const [company, setCompany] = useState([]);

  const compLength = Object.keys(company).length;

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
      toast.loading('Wait for it...', { duration: 1000 });
      const findCompany = await myFetchSym(`${baseUrl}/company/${valuesCopy.symbol}`);
      if (findCompany.marketCapitalization > 0) {
        setCompany(findCompany);
        toast.success('There is the Company');
      }
      if (findCompany.country === undefined) {
        toast.error('There is no company with that symbol :(', { duration: 1400 });
        setInterval(refreshPage, 1400);
      }
    },
  });
  useEffect(() => {
    setCompany({});
  }, []);

  async function getStock() {
    toast.loading('Stocks is loading...', { duration: 1000 });
    const findStock = await myFetch(`${baseUrl}/company/${symbol}/${startime}/${endtime}`);
    const title = [['day', 'Stock Price', '', '', '']];
    var count = Object.keys(findStock.l).length;
    for (let i = 0; i < count; i++) {
      let date = new Date(findStock.t[i] * 1000);
      let innerArray = [date, findStock.l[i], findStock.o[i], findStock.c[i], findStock.h[i]];
      title.push(innerArray);
    }
    setStock(title);
  }
  useEffect(() => {
    setStock({});
  }, [company]);
  function rightClassesForInput(field) {
    let resultClasses = 'form-control';
    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? ' is-invalid' : ' is-valid';
    }
    return resultClasses;
  }
  const options = {
    selectionMode: 'multiple',
    tooltip: { trigger: 'selection' },
    colors: ['rgb(41, 64, 165)'],
    backgroundColor: {
      fill: 'rgb(241, 238, 238)',
      opacity: 50,
    },
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
      {compLength > 0 && (
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
            <Icon icon='fa fa-money' />
          </h3>
          <a href={company.weburl}>
            {company.weburl}
            <Icon icon='fa fa-paper-plane' />
          </a>
        </div>
      )}
      {stock.length > 0 && (
        <div className='chart'>
          <Chart chartType='CandlestickChart' width='100%' height='400px' data={stock} options={options} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
