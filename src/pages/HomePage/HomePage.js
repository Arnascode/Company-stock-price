/* eslint-disable react-hooks/exhaustive-deps */
// import Card from '../components/Card/Card';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { Chart } from 'react-google-charts';
// import css from '../css/Home.module.scss';
// import Card from '../../components/card/Card';

import css from './HomePage.scss';
import { baseUrl, myFetchAuth } from '../../utils';
import Button from '../../components/UI/Button/Button';

function HomePage() {
  const [symbol, setSymbol] = useState([]);
  const [startime, setStartime] = useState([]);
  const [endtime, setEndtime] = useState([]);
  const initValues = {
    symbol: '',
    startime: '',
    endtime: '',
  };

  // const [posts, setPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stock, setStock] = useState([]);
  console.log('posts ===', posts);
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      startime: Yup.date().required('Start date is required'),
      endtime: Yup.date().required('End date is required'),
      symbol: Yup.string()
        .min(1, 'At least 1 characters')
        .max(35)
        .required('Required!')
        .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
    }),

    onSubmit: async (values) => {
      const valuesCopy = { ...values };
      const dateToS = new Date(valuesCopy.startime);
      const dateToE = new Date(valuesCopy.endtime);
      const unixTimestampS = Math.floor(dateToS.getTime() / 1000);
      const unixTimestampE = Math.floor(dateToE.getTime() / 1000);
      setStartime(unixTimestampS);
      setEndtime(unixTimestampE);
      setSymbol(valuesCopy.symbol);

      const findCompany = await myFetchAuth(`${baseUrl}/company/${valuesCopy.symbol}`);
      console.log('findCompany ===', findCompany);
      if (findCompany.marketCapitalization > 0) {
        // setPosts(JSON.stringify(findCompany));
        setPosts(findCompany);
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
    setPosts({});
  }, []);

  async function getStock() {
    const findStock = await myFetchAuth(`${baseUrl}/company/${symbol}/${startime}/${endtime}`);
    setStock(findStock);
  }
  // console.log('getStock() =>', getStock);
  // useEffect(() => {
  //   setStock({});
  // }, []);

  function rightClassesForInput(field) {
    let resultClasses = 'form-control';
    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? ' is-invalid' : ' is-valid';
    }
    return resultClasses;
  }

  // const dataO = {
  //   o: [35.59, 34.97, 35.03, 34.4, 34.63, 34.88],
  //   h: [35.66, 35.48, 35.03, 35.35, 35.21, 35.35],
  //   l: [34.505, 34.5, 33.97, 34.29, 34.39, 34.4],
  //   c: [35.12, 34.77, 34.46, 34.96, 34.49, 34.4],
  //   v: [1575836, 1263832, 1108162, 1037126, 829151, 750651],
  //   t: [1659312000, 1659398400, 1659484800, 1659571200, 1659657600, 1659916800],
  //   s: 'ok',
  // };
  // console.log(posts);
  // const data = [
  //   ['day', 'a', 'b', 'c', 'd'],
  //   ['Mon', 20, 28, 38, 45],
  //   ['Tue', 31, 38, 55, 66],
  //   ['Wed', 50, 55, 77, 80],
  //   ['Thu', 50, 77, 66, 77],
  //   ['Fri', 15, 66, 22, 68],
  // ];
  // open
  //high
  //low prices
  //close
  // volume data
  // time days
  // const options = {
  //   // Allow multiple
  //   // simultaneous selections.
  //   selectionMode: 'multiple',
  //   // Trigger tooltips
  //   // on selections.
  //   tooltip: { trigger: 'selection' },
  //   // Group selections
  //   // by x-value.
  //   aggregationTarget: 'category',
  // };
  // const postsSt = JSON.stringify(posts);
  // console.log(postsSt, '=== stringify');
  // const stockSt = JSON.stringify(stock);
  // console.log(stockSt, '=== stringify');
  // const time = stock.t.split(' 0');
  // console.log(time);
  return (
    <div className={css.center}>
      <h1 className='text-center'>Search Company</h1>
      <form onSubmit={formik.handleSubmit} className={css.container}>
        <div className='invalid-feedback'>{formik.errors.symbol}</div>
        <div className='form-group'>
          <label htmlFor='symbol'>Symbol: </label>
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
          <label htmlFor='startime'>start time: </label>
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
        <div className='invalid-feedback'>{formik.errors.startime}</div>
        <div className='form-group'>
          <label htmlFor='endtime'>end time: </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.endtime}
            type='date'
            className={rightClassesForInput('endtime')}
            id='andtime'
            name='endtime'
          />
          <div className='invalid-feedback'>{formik.errors.endtime}</div>
        </div>
        <Button submit primary>
          Search
        </Button>
      </form>
      <div className='firstCont'>
        <h2 onClick={getStock}>{posts.name}</h2>
        <h3>{posts.country}</h3>
        <h4>{posts.currency}</h4>
        <a href={posts.weburl}>{posts.weburl}</a>
      </div>

      <div className='chart'>
        <h2>{stock.o}</h2>
        <h2>{stock.h}</h2>
        <h2>{stock.l}</h2>
        <h2>{stock.v}</h2>
        <h2>{stock.t}</h2>
        <h2>{stock.s}</h2>
        {/* <Chart chartType='CandlestickChart' width='100%' height='400px' data={dataO} options={options} /> */}
      </div>
    </div>
  );
}

export default HomePage;
