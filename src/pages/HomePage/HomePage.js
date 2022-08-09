/* eslint-disable react-hooks/exhaustive-deps */
// import Card from '../components/Card/Card';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { Chart } from 'react-google-charts';
// import css from '../css/Home.module.scss';
import css from './HomePage.scss';
import { baseUrl, myFetchAuth } from '../../utils';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/card/Card';

function HomePage() {
  // const symbol = localStorage.getItem('symbol');
  const [symbol, setSymbol] = useState([]);
  const [startime, setStartime] = useState([]);
  const [endtime, setEndtime] = useState([]);
  // const startime = localStorage.getItem('startime');
  // const endtime = localStorage.getItem('endtime');
  const initValues = {
    symbol: symbol,
    startime: startime,
    endtime: endtime,
  };

  const [posts, setPosts] = useState([]);
  const [stock, setStock] = useState([]);
  console.log('posts ===', posts);
  console.log('stock ===', stock.t);

  // const [symbolEl, setSymbolEl] = useState({ symbol });
  // console.log('symbol ===', symbol);

  // useEffect(() => {
  //   setSymbolEl({});
  // }, []);
  // useEffect(() => {
  //   setSymbol({ symbol });
  // }, [symbol]);

  // const history = useHistory();

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
      // console.log('valuesCopy ===', valuesCopy.startime.getTime());
      // const dateToUnix = Number(valuesCopy.startime).Math.floor(new Date('2012.08.10').getTime() / 1000);
      // console.log('dateToUnix ===', dateToUnix);
      const dateToS = valuesCopy.startime;
      const dateToE = valuesCopy.endtime;
      const dateS = new Date(dateToS);
      const dateE = new Date(dateToE);
      // const timestampInMs = dateS.getTime();
      const unixTimestampS = Math.floor(dateS.getTime() / 1000);
      const unixTimestampE = Math.floor(dateE.getTime() / 1000);
      console.log(unixTimestampS, unixTimestampE, 'dat');

      const findStock = await myFetchAuth(
        `${baseUrl}/company/${valuesCopy.symbol}/${unixTimestampS}/${unixTimestampE}`
      );
      setStock(findStock);
      console.log('findStock ===', findStock);

      const findCompany = await myFetchAuth(`${baseUrl}/company/${valuesCopy.symbol}`);
      console.log('findCompany ===', findCompany);
      if (findCompany.marketCapitalization > 0) {
        setPosts(findCompany);
      }

      if (findCompany.marketCapitalization > 0) {
        toast.success('There is the Company');
        // history.replace('/');
      }

      if (findCompany.country === undefined) {
        toast.error('there is no company with that symbol');
        // history.replace('/');
      }
    },
  });

  // const getPosts = async () => {
  //   // const fetchResult = await myFetchAuth(`${baseUrl}/company/cc`);
  //   const fetchResult = await myFetchAuth(
  //     `https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=cboeuliad3i6ndrm7nbg`
  //   );
  //   console.log('fetchResult ===', fetchResult);
  //   if (fetchResult.marketCapitalization > 0) {
  //     setPosts(fetchResult);
  //   }
  // };

  // useEffect(() => {
  //   getPosts();
  // }, []);

  useEffect(() => {
    setPosts({});
    setStock({});
  }, []);

  function rightClassesForInput(field) {
    let resultClasses = 'form-control';
    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? ' is-invalid' : ' is-valid';
    }
    return resultClasses;
  }
  // console.log(posts);
  const data = [
    ['day', 'a', 'b', 'c', 'd'],
    ['Mon', 20, 28, 38, 45],
    ['Tue', 31, 38, 55, 66],
    ['Wed', 50, 55, 77, 80],
    ['Thu', 50, 77, 66, 77],
    ['Fri', 15, 66, 22, 68],
  ];
  // open
  //high
  //low prices
  //close
  // volume data
  // time days
  const dataO = {
    ["Day", "", "", "", ""],
    o: [35.59, 34.97, 35.03, 34.4, 34.63, 34.88],
    h: [35.66, 35.48, 35.03, 35.35, 35.21, 35.35],
    l: [34.505, 34.5, 33.97, 34.29, 34.39, 34.4],
    c: [35.12, 34.77, 34.46, 34.96, 34.49, 34.4],
    v: [1575836, 1263832, 1108162, 1037126, 829151, 750651],
    t: [1659312000, 1659398400, 1659484800, 1659571200, 1659657600, 1659916800],
    s: 'ok',
  };
  const options = {
    legend: 'none',
  };

  return (
    <div className={css.center}>
      <h1 className='text-center'>Search Company</h1>
      <form onSubmit={formik.handleSubmit} className={css.container}>
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

          <div className='invalid-feedback'>{formik.errors.symbol}</div>
          {/* <div className='invalid-feedback'>Need to type in</div> */}
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
        <div className='invalid-feedback'>{formik.errors.symbol}</div>
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

          <div className='invalid-feedback'>{formik.errors.symbol}</div>
          {/* <div className='invalid-feedback'>Need to type in</div> */}
        </div>
        <Button submit primary>
          Search
        </Button>
      </form>
      <div className='firstCont'>
        <h2 className={css.title}>{posts.name}</h2>
        <h3 className={css.text}>{posts.country}</h3>
        <h3 className={css.text}>{posts.currency}</h3>
        <a href={posts.weburl}>{posts.weburl}</a>
      </div>
      <div className='chart'>
        <Chart chartType='CandlestickChart' width='100%' height='400px' data={dataO} options={options} />
      </div>
    </div>
  );
}

export default HomePage;
