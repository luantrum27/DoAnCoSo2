import React from 'react'
import styles from './CheckoutPage.module.scss'
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { loginState$, shoppingCartState$ } from '../../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'

import Axios from 'axios'


const cx = classNames.bind(styles)

function CheckoutPage() {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [isPayment, setIsPayment] = React.useState(false);
    const shoppingCart = useSelector(shoppingCartState$);
    const [customerName, setCustomerName] = React.useState(currentUser.name);
    const [customerEmail, setCustomerEmail] = React.useState(currentUser.email);
    const [customerPhone, setCustomerPhone] = React.useState(currentUser.phoneNumber);
    const [customerAddress, setCustomerAddress] = React.useState('');
    const [customerNote, setCustomerNote] = React.useState('');
    const [customerPayment, setCustomerPayment] = React.useState('');
    console.log('shoppingCart: ', shoppingCart);

    const handlerOrder = () => {
        const order = {
            customerId: currentUser.id || '',
            customerName: customerName,
            email: customerEmail,
            phoneNumber: customerPhone,
            note: customerNote,
            payments: customerPayment,
            delivery_address: customerAddress,
        }
        Axios.post('http://localhost:5000/order/add', order)
            .then((res) => {
                navigate('/checkout/success', {state: order});
            })
            .catch(error => console.log(error));
    };

    return (
        <div className={cx('CheckoutPage')}>
            <Navbar />
            <div className={cx('CheckoutPage__wrapper')}>
                {
                    isPayment === false ? (
                        <div className={cx('CheckoutPage__main')}>
                            <h1>?????a ch??? giao h??ng</h1>
                            <form>
                                <div class="mb-3">
                                    <label for="nameInput" class="form-label">H??? v?? t??n</label>
                                    <input type="name" class="form-control" id="nameInput" aria-describedby="emailHelp" placeholder="H??? v?? t??n" value={customerName} onChange={(e) => {
                                        setCustomerName(e.target.value)
                                    }} />
                                </div>
                                <div class="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className={cx('col')}>
                                        <label for="emailInput" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="emailInput" placeholder="Email" value={customerEmail} onChange={(e) => {
                                            setCustomerEmail(e.target.value)
                                        }} />
                                    </div>

                                    <div className={cx('col')}>
                                        <label for="phoneInput" class="form-label">S??? ??i???n tho???i</label>
                                        <input type="text" class="form-control" id="phoneInput" placeholder="S??? ??i???n tho???i" value={customerPhone} onChange={(e) => {
                                            setCustomerPhone(e.target.value)
                                        }} />
                                    </div>

                                </div>
                                <div class="mb-3">
                                    <label for="addressInput" class="form-label">?????a ch???</label>
                                    <input type="text" class="form-control" id="addressInput" value={customerAddress} placeholder="S??? 123, Nguy???n Minh Ch??u, P. H??a H???i, Q. Ng?? H??nh S??n" onChange={(e) => {
                                        setCustomerAddress(e.target.value)
                                    }} />
                                </div>
                                <div class="mb-3">
                                    <label for="descTextArea" class="form-label">Ch?? th??ch</label>
                                    <textarea row="15" class="form-control" id="descTextArea" placeholder="V?? d???: Chuy???n h??ng v??o gi??? h??nh ch??nh,..." onChange={(e) => {
                                        setCustomerNote(e.target.value)
                                    }}>{customerNote}</textarea>
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Y??u c???u in h??a ????n GTGT</label>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Link to={'/'} class='btn btn-secondary' style={{ cursor: 'pointer' }}>Tho??t</Link>
                                    <button type="submit" onClick={() => setIsPayment(!isPayment)} class="btn btn-primary" style={{ backgroundColor: '#000', border: '#000' }}>Ti???p t???c ?????n ph????ng th???c thanh to??n</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className={cx('CheckoutPage__main')}>
                            <div className={cx('CheckoutPage__main--content')}>
                                <div className={cx('section')}>
                                    <div className={cx('section-header')}>
                                        <h2 className={cx('section-title')}>V???n chuy???n</h2>
                                    </div>
                                    <div className={cx('section-content')}>
                                        <div className={cx('content-box')}>
                                            <div className={cx('content-box-row')}>
                                                <div className={cx('radio-wrapper')}>
                                                    <label className={cx('radio-label')} htmlFor='shipping_method__0'>
                                                        <span className={cx('radio-label-primary')}>
                                                            <strong>Ph?? giao h??ng t???n n??i</strong>
                                                            <br />
                                                            {"Ph?? v???n chuy???n Vi???t Nam"}
                                                        </span>
                                                        <span className={cx('radio-accessory', 'content-box-emphasis')}>50,000??</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('section')}>
                                    <div className={cx('section-header')}>
                                        <h2 className={cx('section-title')}>Ph????ng th???c thanh to??n</h2>
                                    </div>
                                    <p className={cx('text-danger')}></p>
                                    <div className={cx('section-content')}>
                                        <div className={cx('radio-wrapper', 'content-box-row')}>
                                            <lable className={cx('radio-label')} for='payment-method-bank_transfer'>
                                                <div className={cx('radio-input', 'payment-method-checkbox')}>
                                                    <input id="payment-method-bank_transfer" className={cx('input-radio')} name="tranfer" type="radio" value="bank_transfer" checked={customerPayment === 'bank_transfer' ? true : false} onChange={(e) => {
                                                        setCustomerPayment(e.target.value)
                                                    }} />
                                                </div>
                                                <div className={cx('radio-content-input')}>
                                                    <img className={cx('main-img')} src='https://sfresh.w2.exdomain.net/catalog/view/theme/default/image/payment/bank_transfer.png' alt="" />
                                                    <div>
                                                        <span className={cx('radio-label-primary')}><strong>Chuy???n kho???n</strong></span>
                                                        <span className={cx('quick-tagline')}>S??? d???ng th??? ATM ho???c d???ch v??? Internet Banking ????? ti???n h??nh chuy???n kho???n cho ch??ng t??i</span>
                                                    </div>
                                                </div>
                                            </lable>
                                        </div>
                                        <div className={cx('radio-wrapper', 'content-box-row')}>
                                            <lable className={cx('radio-label')} for='payment-method-bank_transfer'>
                                                <div className={cx('radio-input', 'payment-method-checkbox')}>
                                                    <input id="payment-method-bank_transfer" className={cx('input-radio')} name="tranfer" type="radio" value="direct_transfer" checked={customerPayment === 'direct_transfer' ? true : false} onChange={(e) => {
                                                        setCustomerPayment(e.target.value)
                                                    }} />
                                                </div>
                                                <div className={cx('radio-content-input')}>
                                                    <img className={cx('main-img')} src='https://sfresh.w2.exdomain.net/catalog/view/theme/default/image/payment/bank_transfer.png' alt="" />
                                                    <div>
                                                        <span className={cx('radio-label-primary')}><strong>Thanh to??n khi nh???n h??ng</strong></span>
                                                        <span className={cx('quick-tagline')}>S??? d???ng ti???n m???t thanh to??n khi nh???n h??ng.</span>
                                                    </div>
                                                </div>
                                            </lable>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('CheckoutPage__main--content')}>
                                <div className={cx('CheckoutPage__main--footer')}>
                                    <div className={cx('step-footer-previous-link', 'btn-step-back')} onClick={() => setIsPayment(!isPayment)}><i class="fa-solid fa-backward"></i> {" Quay l???i th??ng tin giao h??ng"} </div>
                                    <Link to={''} className={cx('step-footer-continue-btn', 'btn')} onClick={() => handlerOrder()}> ?????t h??ng </Link>
                                </div>
                            </div>
                        </div>
                    )
                }

                <div className={cx('CheckoutPage__sidebar')}>
                    <div className={cx('CheckoutPage__sidebar-products')}>
                        <ul className={cx('shoppingCart__list')} style={{ height: '200px', overflowY: 'scroll' }}>
                            {
                                shoppingCart.map((item, index) => (
                                    <li>
                                        <div className={cx('CheckoutPage__sidebar-media')}>
                                            <div>
                                                <img src={item.image} alt={item.title} />
                                            </div>
                                            <p>{item.title}</p>
                                        </div>
                                        <p>{item.priceCurrent}??</p>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className={cx('line')}></div>
                        <div class="mb-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%', margin: '20px auto' }}>
                            <input type="text" class="form-control" id="saleCode" placeholder="Nh???p m?? gi???m gi??" style={{ width: '280px' }} />
                            <div class="btn btn-primary" style={{ backgroundColor: '#000', border: '#000' }}>??p d???ng</div>
                        </div>
                        <div className={cx('line')}></div>
                        <div style={{ width: '80%', margin: '0 auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p>Th??nh ti???n:</p>
                                <p>128000??</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CheckoutPage