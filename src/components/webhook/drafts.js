// // Object.keys(webhooks).map((w, index) =>
// //     <div index={index}>
// //         {console.log("pp" + webhooks[w])}
// //     </div>

// const toggle = (Sip) => {
//     // 1. Make a shallow copy of the items
//    let items = [state.webhooks];
//    // 2. Make a shallow copy of the item you want to mutate
//    let item = items.find((w, index) => w.IP ==Sip)
//    // 3. Replace the property you're intested in
//    item.blocked = webhookService.toggleBlock(Sip);
//    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
//    items[item.index] = item;
//    // 5. Set the state to our new copy
//    this.setState({items});
//    }


//    <table class="table">
//    <thead>
//        <tr>
//            <th >Nickname</th>
//            <th >Source</th>
//            <th >IP Address</th>
//            <th></th>
//        </tr>
//    </thead>
//    <tbody>{
//        webhooks ?
//            webhooks.map((w) => (
//                <tr key={w.IP}>
//                    <th>{w.nickname}</th>
//                    <th>{w.source}</th>
//                    <th>{w.IP}</th>
//                    <th><label class="switch">

//                         <input type="checkbox" checked={w.isBlocked} />
//                        <span class="slider round"></span>
//                    </label></th>
//                </tr>
//            )) : ""
//    }
//    </tbody>
// </table>


// // <label class="switch">
// //                     <input type="checkbox" checked={toggle(e)}  id="on-off"/>
// //                     <span class="slider round"></span>
// //                 </label>

// const load = (id) => {
//       ;
//     document.getElementById('ip-' + id.IP).checked = id.blocked
//     // return id.blocked

// }

// const toggle = async (e) => {
//     const Sip = e.currentTarget.parentElement.parentElement.parentElement.children[2].innerHTML;
//     await webhookService.toggleBlock(Sip, e.currentTarget.value);
//     // setIsBlocked(checked);
// }
// const deleteSource = async (e) => { }

// /* The switch - the box around the slider */
// .switch {
//     position: relative;
//     display: inline-block;
//     width: 60px;
//     height: 34px;
//   }

//   /* Hide default HTML checkbox */
//   .switch input {
//     opacity: 0;
//     width: 0;
//     height: 0;
//   }

//   /* The slider */
//   .slider {
//     position: absolute;
//     cursor: pointer;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: #ccc;
//     -webkit-transition: .4s;
//     transition: .4s;
//   }

//   .slider:before {
//     position: absolute;
//     content: "";
//     height: 26px;
//     width: 26px;
//     left: 4px;
//     bottom: 4px;
//     background-color: white;
//     -webkit-transition: .4s;
//     transition: .4s;
//   }

//   input:checked + .slider {
//     background-color: #2196F3;
//   }

//   input:focus + .slider {
//     box-shadow: 0 0 1px #2196F3;
//   }

//   input:checked + .slider:before {
//     -webkit-transform: translateX(26px);
//     -ms-transform: translateX(26px);
//     transform: translateX(26px);
//   }

//   /* Rounded sliders */
//   .slider.round {
//     border-radius: 34px;
//   }

//   .slider.round:before {
//     border-radius: 50%;
//   }

{/* <div className="link d-flex">
                                <p  className="copy-link">https://webhook.leader.codes/{userName}</p>
                                <button className="btn link-btn">Copy</button>
                            </div> */}


<div className="toast" id="toast" data-autohide="true">
    <div className="toast-header">
        <strong className="mr-auto text-primary">Copied! </strong>
        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast">&times;</button>
    </div>
</div>


.copiedLinkAlert {
    width: 110px!important;
    height: 35px!important;
    padding - top: 4px!important;
    position: absolute;
    z - index: 3;
    margin - left: 250px;
    margin - top: 40px;
    /* padding-bottom: 20px !important; */
}



// {
//     copied ?
//         <Alert variant="secondary" className="copiedLinkAlert">
//             url copied
//         </Alert>
//         : " "
// }


