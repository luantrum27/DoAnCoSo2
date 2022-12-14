import React from 'react'
import styles from './ModalUpdateProduct.module.scss'
import classNames from 'classnames/bind'
import Overlay from '../../Overlay'
import { useDispatch } from 'react-redux';
import { hideModalUpdateProduct } from '../../../redux/actions';
import Axios from 'axios'
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles)

function ModalUpdateProduct() {

  const [name, setName] = React.useState();
  const [quantity, setQty] = React.useState();
  const [price, setPrice] = React.useState();
  const [salePercent, setSalePercent] = React.useState();
  const [status, setStatus] = React.useState();
  const [previewSource, setPreviewSource] = React.useState();

  const setData = (product) => {
    setName(product.title ? product.title : '');
    setQty(product.qty ? product.qty : 0);
    setPrice(product.priceCurrent ? product.priceCurrent : '');
    setSalePercent(product.salePercent ? product.salePercent : '');
    setStatus(product.status ? product.status : '');
    setPreviewSource(product.image ? product.image : '');
  }

  const { id } = useParams();

  const dispatch = useDispatch();

  const hideModalUpdate = React.useCallback(() => {
    dispatch(hideModalUpdateProduct());
  }, [dispatch]);

  React.useEffect(() => {
    Axios.get('http://localhost:5000/products/' + id).then((res) => {
      setData(res.data[0])
    })
  }, []);

  const submitUpdateProduct = () => {

    const newProduct = {
      "title": name,
      "qty": quantity,
      "salePercent": salePercent,
      "status": status,
      "image": previewSource,
      "priceCurrent": price
    }
    Axios.post(`http://localhost:5000/products/update/${id}`,
      newProduct).then(() => {
        window.location.reload(false);
      })
  }

  return (
    <div className={cx('modalUpdateProduct')}>
      <Overlay />
      <div className={cx('modalUpdateProduct__wrapper')}>
        <div className={cx('modalUpdateProduct__content')}>
          <div className={cx('modalUpdateProduct__content--title')}>
            <h3>Ch???nh s???a th??ng tin c?? b???n</h3>
          </div>
          <div className={cx('line')}></div>
          <div className={cx('modalUpdateProduct__content--form')}>
            <div className={cx('modalUpdateProduct__content--row')}>
              <div className={cx('modalUpdateProduct__content--column')}>
                <label htmlFor='nameProduct'>T??n s???n ph???m</label>
                <input type="text" id="nameProduct" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className={cx('modalUpdateProduct__content--column')}>
                <label htmlFor='salePercent'>Gi???m gi??(%)</label>
                <input type="text" id="salePercent" value={salePercent} onChange={(e) => setSalePercent(e.target.value)} />
              </div>
            </div>
            <div className={cx('modalUpdateProduct__content--row')}>
              <div className={cx('modalUpdateProduct__content--column')}>
                <label htmlFor='quantityProduct'>S??? l?????ng</label>
                <input type="number" id="quantityProduct" value={quantity} onChange={(e) => setQty(e.target.value)} />
              </div>
              <div className={cx('modalUpdateProduct__content--column')}>
                <label htmlFor='statusProduct'>T??nh tr???ng</label>
                <select id="statusProduct" onChange={(e) => setStatus(e.target.value)}>
                  {
                    status === 'C??n h??ng' ?
                      <>
                        <option value='C??n h??ng' selected>C??n h??ng</option>
                        <option value='H???t h??ng'>H???t h??ng</option>
                        <option value='??ang nh???p h??ng'>??ang nh???p h??ng</option>
                      </>
                      : ''
                  }
                  {
                    status === 'H???t h??ng' ?
                      <>
                        <option value='C??n h??ng'>C??n h??ng</option>
                        <option value='H???t h??ng' selected>H???t h??ng</option>
                        <option value='??ang nh???p h??ng' selected>??ang nh???p h??ng</option>
                      </>
                      : ''
                  }
                  {
                    status === '??ang nh???p h??ng' ?
                      <>
                        <option value='C??n h??ng'>C??n h??ng</option>
                        <option value='H???t h??ng'>H???t h??ng</option>
                        <option value='??ang nh???p h??ng' selected>??ang nh???p h??ng</option>
                      </>
                      : ''
                  }
                </select>
              </div>
            </div>
            <div className={cx('modalUpdateProduct__content--row')}>
              <div className={cx('modalUpdateProduct__content--column')}>
                <label htmlFor='priceProduct'>Gi?? b??n</label>
                <input type="text" id="priceProduct" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className={cx('modalUpdateProduct__content--column')}>
                <label htmlFor='categories'>Danh m???c</label>
                <select id="categories">
                  <option value='C??n h??ng'>Tr??i c??y</option>
                  <option value='H???t h??ng'>Th???c ??n</option>
                  <option value='??ang nh???p h??ng'>N?????c u???ng</option>
                </select>
              </div>
            </div>
          </div>
          <Link to={`/admin/products/update-product/${id}`} onClick={hideModalUpdate} className={cx('modalUpdateProduct__content--advanced')}>
            <p>Ch???nh s???a n??ng cao</p>
          </Link>
          <div className={cx('modalUpdateProduct__content--btn')}>
            <div className={cx("btn", "btn-save")} onClick={submitUpdateProduct}>L??u l???i</div>
            <div className={cx("btn", "btn-cancel")} onClick={hideModalUpdate}>H???y b???</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalUpdateProduct