import './mobile.scss'
import appBox from '../../assets/appBox.svg'
import { connect } from "react-redux"
import { useSelector, useDispatch } from 'react-redux';

import {setUserFromMobile ,SET_USER_FROM_MOBILE} from '../../redux/actions/init.actions'
function Mobile(props){
    // const [continueToTheWeb, setContinueToTheWeb] = useState(false)
    const dispatch = useDispatch();

    return (
        <>
            <div className="allDivs">

                <div className="divIcon1"><img src={appBox} className="txticon"></img></div>
                <div className="txticon" >Leader box</div>
                <p className="headerrrr1">Out to the</p>
                <p className="headerrrr2">box inbox</p>
                <div className="p1">Download the app to enjoy<br></br>the full experience.</div>
                <div  >
                    <button className="btnApp1 btn">
                        <a className="a1" href="https://play.google.com/store/apps/details?id=com.rnfirebasev7">Get the app</a>
                    </button>
                </div>
                <br></br>
                <div>
                <button className="btnWeb btn"  onClick={() => {
                    //  props.setUserFromMobile()
                    dispatch({ type: SET_USER_FROM_MOBILE, payload: false })
                    // setContinueToTheWeb(!continueToTheWeb)
                    }}>Continue to web
                </button>
                </div>
            </div>
        </>
    )
}
export default connect(
        
    (state) => {},{
        setUserFromMobile
    }  

)(Mobile)