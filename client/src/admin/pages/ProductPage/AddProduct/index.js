import React from 'react'
import styles from './AddProduct.module.scss'
import classNames from 'classnames/bind'
import AppTitle from '../../../../components/admin/AppTitle'
import { Link } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createProduct } from '../../../../redux/actions'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FileBase64 from 'react-file-base64'
import * as actions from '../../../../redux/actions'
import { distributorsState$, categoryState$ } from '../../../../redux/selectors';
import Axios from 'axios';

const cx = classNames.bind(styles)

function AddProduct() {
  const distributors = useSelector(distributorsState$);
  const categories = useSelector(categoryState$);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [idState, setIdState] = React.useState(0);
  const [data, setData] = React.useState('');

  const handleClose = () => {
    
    if (idState === 1) {
      const parameters = {
        supplier: data
      }
      Axios.post('http://localhost:5000/distributors/add', parameters, {
        headers: {
          header1: `Bearer $`,
        }
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else if (idState === 2) {
      const parameters = {
        category_item: data
      }
      Axios.post('http://localhost:5000/category/add', parameters)
      .then(function (response) {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    setShow(false);
  };
  const handleShow = (id) => {
    setShow(true);
    setIdState(id);
  };

  const [title, setTitle] = React.useState('');
  const [image, setImage] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [quantity, setQuantity] = React.useState(0);
  const [priceCurrent, setPriceCurrent] = React.useState('');
  const [priceCost, setPriceCost] = React.useState('');
  const [salePercent, setSalePercent] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [distributor, setDistributor] = React.useState('');

  const handleSave = () => {
    const product = {
      title: title,
      description: description,
      qty: quantity,
      image: image,
      priceCurrent: priceCurrent,
      priceCost: priceCost,
      category: category.value,
      salePercent: salePercent,
      distributor: distributor.value,
      status: status.value,
    }

    dispatch(createProduct.createProductRequest(product));
    navigate('/admin/products');
  }

  React.useEffect(() => {
    dispatch(actions.getDistributors.getDistributorsRequest());
    dispatch(actions.getCategory.getCategoryRequest());
  }, [])

  return (
    <div className={cx('addProduct')}>
      <div className={cx('addProduct__wrapper')}>
        <AppTitle title={`Danh s??ch s???n ph???m / T???o m???i s???n ph???m`} />
      </div>
      <div className={cx('addProduct__wrapper')}>
        <div className={cx('addProduct__tile')}>
          <h3 className={cx('addProduct__tile--title')}>
            T???o m???i s???n ph???m
          </h3>
          <div className={cx('addProduct__tile--body')}>
            <ul className={cx('addProduct__tile--functions')}>
              <li>
                <Link to={''} onClick={() => handleShow(1)} className={cx('btn', 'btn-add', 'btn-sm')} data-toggle="modal" data-target="#addNhaCungCap">
                  <i className='fas fa-folder-plus'></i>
                  {" Th??m nh?? cung c???p"}
                </Link>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {
                        idState === 1 ? 'Th??m m???i nh?? cung c???p' : ''
                      }
                      {
                        idState === 2 ? 'Th??m m???i danh m???c' : ''
                      }
                      {
                        idState === 3 ? 'Th??m m???i t??nh tr???ng' : ''
                      }
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className={cx("form-group col-md-3")}>
                    <div>
                      <label className={cx("control-label")} style={{ width: '200px' }}>
                        {
                          idState === 1 ? 'Nh???p t??n nh?? cung c???p m???i' : ''
                        }
                        {
                          idState === 2 ? 'Nh???p t??n danh m???c m???i' : ''
                        }
                        {
                          idState === 3 ? 'Nh???p t??nh tr???ng m???i' : ''
                        }
                      </label>
                      <input className={cx("form-control")} style={{ width: '450px', marginLeft: '8px' }} type="text" placeholder="" onChange={(e) => setData(e.target.value)} />
                      {
                        idState === 2 ? (
                          <>
                            <label className={cx("control-label")} style={{ width: '200px', marginTop: '10px' }}>Danh s??ch danh m???c ???? c??</label>
                            <ul style={{ paddingLeft: '20px', overflowY: 'scroll', width: '500%' }}>
                              {
                                categories.map((category, index) => (
                                  <li key={index} style={{ listStyle: 'circle' }}>{category.category_item}</li>
                                ))
                              }
                            </ul>
                          </>
                        ) : ''
                      }
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className={cx('btn', 'btn-danger')} onClick={handleClose}>
                      H???y b???
                    </Button>
                    <Button className={cx('btn', 'btn-success')} onClick={handleClose}>
                      L??u l???i
                    </Button>
                  </Modal.Footer>
                </Modal>
              </li>
              <li>
                <Link to={''} onClick={() => handleShow(2)} className={cx('btn', 'btn-add', 'btn-sm')}>
                  <i className='fas fa-folder-plus'></i>
                  {" Th??m danh m???c"}
                </Link>
              </li>
              <li>
                <Link to={''} onClick={() => handleShow(3)} className={cx('btn', 'btn-add', 'btn-sm')}>
                  <i className='fas fa-folder-plus'></i>
                  {" Th??m t??nh tr???ng"}
                </Link>
              </li>
            </ul>
          </div>
          <form className={cx('row')}>
            <div className={cx("form-group col-md-3")}>
              <label className={cx("control-label")}>T??n s???n ph???m </label>
              <input className={cx("form-control")} type="text" placeholder="" onChange={e => setTitle(e.target.value)} />
            </div>
            <div className={cx("form-group col-md-3")}>
              <label className={cx("control-label")}>S??? l?????ng</label>
              <input className={cx("form-control")} type="number" placeholder="" onChange={e => setQuantity(e.target.value)} />
            </div>
            <div className={cx("form-group col-md-3")}>
              <label htmlFor='statusInput' className={cx("control-label")}>T??nh tr???ng</label>
              <select className={cx("form-control")} id="statusInput" onChange={e => setStatus({ value: e.target.value })}>
                <option>-- Ch???n t??nh tr???ng --</option>
                <option value="C??n h??ng">C??n h??ng</option>
                <option value="H???t h??ng">H???t h??ng</option>
              </select>
            </div>

            <div className={cx("form-group col-md-3")}>
              <label htmlFor='nhaCungCap' className={cx("control-label")}>Danh m???c</label>
              <select className={cx("form-control")} id="nhaCungCap" onChange={e => setCategory({ value: e.target.value })}>
                <option>-- Ch???n danh m???c --</option>
                {
                  categories.map((category, index) => (
                    <option key={index} value={category.category_item}>{category.category_item}</option>
                  ))
                }
              </select>
            </div>
            <div className={cx("form-group col-md-3")}>
              <label htmlFor='nhaCungCap' className={cx("control-label")}>Nh?? cung c???p</label>
              <select className={cx("form-control")} id="nhaCungCap" onChange={e => setDistributor({ value: e.target.value })}>
                <option>-- Ch???n nh?? cung c???p --</option>
                {
                  distributors.map((distributor, index) => (
                    <option key={index} value={distributor.supplier}>{distributor.supplier}</option>
                  ))
                }
              </select>
            </div>
            <div className={cx("form-group col-md-3")}>
              <label className={cx("control-label")}>Gi?? b??n</label>
              <input className={cx("form-control")} type="text" placeholder="" onChange={e => setPriceCurrent(e.target.value)} />
            </div>
            <div className={cx("form-group col-md-3")}>
              <label className={cx("control-label")}>Gi?? v???n</label>
              <input className={cx("form-control")} type="text" placeholder="" onChange={e => setPriceCost(e.target.value)} />
            </div>
            <div className={cx("form-group col-md-3")}>
              <label className={cx("control-label")}>Gi???m gi??(%) </label>
              <input className={cx("form-control")} type="text" placeholder="" onChange={e => setSalePercent(e.target.value)} />
            </div>
            <div className={cx("form-group col-md-12")} style={{ marginBottom: '10px' }}
            >
              <label className={cx("control-label")}>???nh s???n ph???m</label>
              <br />
              <img src={image} alt={title} style={{ width: '100px', borderRadius: '10px' }} />
              <div>
                <FileBase64
                  accept='image/*'
                  multiple={false}
                  type='file'
                  height="450"
                  width="400"
                  alt="Thumb image"
                  id={styles.thumbimage}
                  onDone={({ base64 }) => setImage(base64)} />
              </div>
            </div>
            <div className={cx("form-group col-md-12")}>
              <label className={cx('control-label')}>M?? t??? s???n ph???m</label>
              <CKEditor
                editor={ClassicEditor}
                data=""
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                  setDescription(data);
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
            </div>
          </form>
          <button className={cx('btn', 'btn-save')} style={{ marginRight: '20px' }} onClick={handleSave} >L??u l???i</button>
          <Link to='/admin' className={cx('btn', 'btn-cancel')}>H???y b???</Link>
        </div>
      </div>
    </div >
  )
}

export default AddProduct