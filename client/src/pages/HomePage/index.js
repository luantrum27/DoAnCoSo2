import React from 'react'
import styles from './HomePage.module.scss'
import classNames from 'classnames/bind'
import Navbar from '../../components/Navbar'
import { Banner1, Banner2, Banner3, Banner4, Banner5, BannerShipper, BgrMainBanner, Item1, Item2, Item3, Item4, Item5, Item6, News1, News2, News3, News4, NewsTheme, Product1, Product2, Product3, Product4, Product5, Product6, Product7, Product8, SVG } from '../../assets/img'
import { Link, useLocation } from 'react-router-dom'
import { RiArrowRightSFill, RiArrowLeftSFill } from 'react-icons/ri'
import Slide from '../../components/ProductList/Slide'
import Banner from '../../components/BannerList/Banner'
import { fruits } from './data/fruits'
import { fresh_food } from './data/fresh_food'
import { vegetable } from './data/vegetable'
import News from '../../components/News'
import Footer from '../../components/Footer'
import Cart from '../../components/Cart'
import { useSelector, useDispatch } from 'react-redux'
import { modalCartState$, loginState$, productsState$ } from '../../redux/selectors';
import Product from '../../components/ProductList/Product'
import { getProducts } from '../../redux/actions'

const cx = classNames.bind(styles)

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector(productsState$);
  const { isShowModalCart } = useSelector(modalCartState$);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [slide, setSlide] = React.useState(0);
  const [slide2, setSlide2] = React.useState(0);
  const [length, setLength] = React.useState(products.length);
  const handleLeft = () => {
    if (slide >= 0) {
      setSlide(0)
    }
    else {
      setSlide(prev => prev + 1);
    }
  }
  const handleRight = () => {
    if (slide <= -3) {
      setSlide(-3)
    }
    else {
      setSlide(prev => prev - 1);
    }
  }
  const handleLeft2 = () => {
    if (slide2 >= 0) {
      setSlide2(0)
    }
    else {
      setSlide2(prev => prev + 1);
    }
  }
  const handleRight2 = () => {
    if (slide2 <= -3) {
      setSlide2(-3)
    }
    else {
      setSlide2(prev => prev - 1);
    }
  }
  const marginLeft = slide * 277 + 'px'
  const marginLeft2 = slide2 * 240 + 'px'


  React.useEffect(() => {
    dispatch(getProducts.getProductsRequest());
    setLength(products.length);
}, [dispatch]);


  return (
    <div className={cx('homePage')}>
      <Navbar currentUser={currentUser} />
      {
        isShowModalCart && <Cart />
      }
      <div className={cx('homePage__banner')}>
        <img src={BgrMainBanner} alt='Banner' />
      </div>
      <ul className={cx('homePage__swiper')}>
        <li className={cx('homePage__swiper--item')}>
          <Link to={''}>
            <img src={Item1} alt='Item' className={cx('homePage__swiper--image')} />
          </Link>
          <p className={cx('homePage__swiper--desc')}>Rau c??? qu???</p>
        </li>
        <li className={cx('homePage__swiper--item')}>
          <Link to={''}>
            <img src={Item2} alt='Item' className={cx('homePage__swiper--image')} />
          </Link>
          <p className={cx('homePage__swiper--desc')}>Th???t t????i s???ng</p>

        </li>
        <li className={cx('homePage__swiper--item')}>
          <Link to={''}>
            <img src={Item3} alt='Item' className={cx('homePage__swiper--image')} />
          </Link>
          <p className={cx('homePage__swiper--desc')}>Th???c ph???m kh??</p>

        </li>
        <li className={cx('homePage__swiper--item')}>
          <Link to={''}>
            <img src={Item4} alt='Item' className={cx('homePage__swiper--image')} />
          </Link>
          <p className={cx('homePage__swiper--desc')}>Tr??i c??y</p>

        </li>
        <li className={cx('homePage__swiper--item')}>
          <Link to={''}>
            <img src={Item5} alt='Item' className={cx('homePage__swiper--image')} />
          </Link>
          <p className={cx('homePage__swiper--desc')}>Tr???ng v?? b??</p>

        </li>
        <li className={cx('homePage__swiper--item')}>
          <Link to={''}>
            <img src={Item6} alt='Item' className={cx('homePage__swiper--image')} />
          </Link>
          <p className={cx('homePage__swiper--desc')}>????? u???ng</p>

        </li>
      </ul>
      <div className={cx('homePage__endow')}>
        <div className={cx('homePage__endowList')}>
          <div className={cx('homePage__endowList--title')}>
            <Link to={'/1'}>
              <img className={cx('title__icon')} src={SVG} alt='' />
              <h2>??u ????i trong tu???n</h2>
            </Link>
          </div>
          <div className={cx('homePage__endowList--display')}>
            <ul className={cx('productList')} style={{ marginLeft: marginLeft, transition: 'all ease-in-out 0.4s' }}>
              {
                products.map((product) => (
                  <Product
                    key={product.id}
                    settings={product.setting}
                    title={product.title}
                    priceCurrent={product.priceCurrent}
                    salePercent={product.salePercent}
                    image={product.image}
                    product={product}
                  />
                ))
              }
            </ul>
          </div>
          {
            slide === -3 ? <></>
              : (
                <div className={cx('right--icon', 'direction')}>
                  <RiArrowRightSFill onClick={handleRight} className={cx('arrowRight', 'arrow')} />
                </div>
              )
          }
          {
            slide === 0 ? <></>
              : (
                <div className={cx('left--icon', 'direction')}>
                  <RiArrowLeftSFill onClick={handleLeft} className={cx('arrowLeft', 'arrow')} />
                </div>
              )
          }
        </div>
      </div>
      <ul className={cx('banner')}>
        <li className={cx('banner__item')}>
          <Link to={'/'}>
            <img src={Banner1} alt='' className={cx('banner__item--img')}/>
          </Link>
        </li>
        <li className={cx('banner__item')}>
          <Link to={'/'}>
            <img src={Banner2} alt='' className={cx('banner__item--img')}/>
          </Link>
        </li>
      </ul>
      <div className={cx("list__product")}>
        <Banner
          image={Banner3}
          items={fruits}
          title={'Tr??i c??y'}
        />
        <div className={cx("list__product--slide")}>
          <ul>
            <Slide marginLeft={marginLeft2} />
          </ul>
        </div>
        {
          slide2 === -3 ? <></>
            : (
              <div className={cx('right--icon', 'direction', 'right')}>
                <RiArrowRightSFill onClick={handleRight2} className={cx('arrowRight', 'arrow')} />
              </div>
            )
        }
        {
          slide2 === 0 ? <></>
            : (
              <div className={cx('left--icon', 'direction', 'left')}>
                <RiArrowLeftSFill onClick={handleLeft2} className={cx('arrowLeft', 'arrow')} />
              </div>
            )
        }
      </div>
      <div className={cx("list__product")}>
        <Banner
          right={true}
          image={Banner4}
          items={vegetable}
          title={'Rau c??? qu???'}
        />
        <div className={cx("list__product--slide")} style={{ marginLeft: '20px', width: '70%' }}>
          <ul style={{ width: '111%' }}>
            <Slide marginLeft={marginLeft2} />
          </ul>
        </div>
        {
          slide2 === -3 ? <></>
            : (
              <div className={cx('right--icon', 'direction', 'right')} style={{ right: '27.5%' }}>
                <RiArrowRightSFill onClick={handleRight2} className={cx('arrowRight', 'arrow')} />
              </div>
            )
        }
        {
          slide2 === 0 ? <></>
            : (
              <div className={cx('left--icon', 'direction', 'left')} style={{ left: '0' }}>
                <RiArrowLeftSFill onClick={handleLeft2} className={cx('arrowLeft', 'arrow')} />
              </div>
            )
        }
      </div>
      <div className={cx("list__product")}>
        <Banner
          image={Banner5}
          items={fresh_food}
          title={'Th???c ph???m t????i'}
        />
        <div className={cx("list__product--slide")}>
          <ul>
            <Slide marginLeft={marginLeft2} />
          </ul>
        </div>
        {
          slide2 === -3 ? <></>
            : (
              <div className={cx('right--icon', 'direction', 'right')}>
                <RiArrowRightSFill onClick={handleRight2} className={cx('arrowRight', 'arrow')} />
              </div>
            )
        }
        {
          slide2 === 0 ? <></>
            : (
              <div className={cx('left--icon', 'direction', 'left')}>
                <RiArrowLeftSFill onClick={handleLeft2} className={cx('arrowLeft', 'arrow')} />
              </div>
            )
        }
      </div>
      <div className={cx('banner__shipper')}>
        <img src={BannerShipper} alt='Banner Shipper' />
        <div className={cx('banner__shipper--content')}>
          <h2>Giao h??ng mi???n ph?? t???n nh?? trong v??ng 24h</h2>
          <div className={cx('banner__shipper--button')}>
            T??m hi???u th??m
          </div>
        </div>
      </div>
      <div className={cx('news')}>
        <div className={cx('news__title')}>
          <h1>Tin t???c m???i nh???t</h1>
          <img src={NewsTheme} alt='' />
        </div>
        <ul className={cx('news__list')}>
          <News
            image={News1}
            desc='??i ch??? online: Xu h?????ng l??n ng??i...'
            user='John Doe'
            time='30/06/2022'
          />
          <News
            image={News2}
            desc='C??ch ch???n rau c??? qu??? s???ch t????i n...'
            user='David Lux'
            time='16/06/2022'
          />
          <News
            image={News3}
            desc='C??c lo???i ng?? c???c t???t cho s???c kh???e...'
            user='Frankie De Boud'
            time='20/07/2022'
          />
          <News
            image={News4}
            desc='C??c c??ch ch??? bi???n m??n ??n t??? rau...'
            user='John Doe'
            time='30/06/2022'
          />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage