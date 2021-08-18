import React, { useState } from 'react';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getLabelsGmailServer } from '../../redux/actions/googleAuth.actions'

import './setting.css'

function Setting(props) {
    const [checked, setChecked] = useState(true);

    let chex = null
    let che
    // alert(props.gmailUserAddress)
    function handleChange(event) {
        setChecked(event.target.checked);

        alert(event)
        chex = !chex
    }
    return (
        <>
            <div className="title">Account setting</div>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">Google account </div>
                        <div className="input_google_accaunts" >{props.gmailUserAddress && props.gmailUserAddress || "you click google auth to get sync "}</div>

                        {/* <FormControlLabel
      defaultChecked
          value="end"
          control={<Checkbox defaultChecked checked={chex} onChange={handleChange} name="checkedG" />}
          label="import gmail labels"
          labelPlacement="end"
        />
     <Checkbox
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <p></p> */}

                        <FormControlLabel
                            value="end"
                            control={<Checkbox color="primary" checked={checked} onChange={handleChange = (event) => { if (checked) { props.getLabelsGmailServer() } console.log(event) }} />}
                            label="import gmail labels"
                            labelPlacement="end"
                        />
                        <div className="line"></div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default connect(
    (state) => {
        return {

            user: state.init.user,
            gmailUserAddress: state.googleAuth.gmailUserAddress

        }
    },
    {
        getLabelsGmailServer: getLabelsGmailServer,

    }
)(Setting)
