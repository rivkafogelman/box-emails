import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { updateNickname, toggleBlock } from '../../redux/actions/webhook.actions'
import { setWebhooksByUser } from '../../redux/actions/init.actions'
import './webhook.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import copy from './assets/copy.svg';
import search from './assets/search_black_18dp.svg';
import question from './assets/question.svg';
import allText from '../../allText.json'
import imgNotFound from './assets/imgNotFound.png'
// import animate from './assets/animate.svg'
// import Alert from 'react-bootstrap/Alert'
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import Switch from "react-switch";


function Webhook(props) {

    const dispatch = useDispatch();
    const { userName, webhooks, systemWaves } = props
    // const [counter, setCounter] = useState([]);
    const [visibleList, setVisibleList] = useState([]);
    const [copied, setCopied] = useState(false);
    // const [name, setName] = useState();
    let link = allText.webhook.webhookLink + userName


    useEffect(() => {
        const webhooks_2 = [...webhooks];
        webhooks_2.map((w, i) => webhooks_2[i] = addConter(w, i));
        dispatch(setWebhooksByUser(webhooks_2));
    }, [systemWaves])

    useEffect(() => {
        //  
        let hide = false
        if (document.getElementById('hide-Blocked'))
            hide = document.getElementById('hide-Blocked').checked
        if (hide == true)
            setVisibleList(webhooks.filter(webhook => webhook.blocked === false));
        if (hide == false)
            setVisibleList(webhooks);
    }, [webhooks])

    const indication = () => {
        return (
            webhooks ?
                <>
                    <img src={imgNotFound} />
                    <br />
                    <span className="NoResultFound">{allText.webhook.noWebhooks}</span>
                </> : <></>

        )
    }

    const addConter = (webhook, index) => {
        let counter = 0
        counter = systemWaves.filter((sw) => { if (sw.sourceIp) return sw.sourceIp == webhook.IP }).length
        const webh = { ...webhook }
        webh.counter = counter;
        return webh;
    }
    const hideBlocked = (e) => {
        //  
        let hide = e.currentTarget.checked
        if (hide == true)
            setVisibleList(webhooks.filter(webhook => webhook.blocked === false));
        if (hide == false)
            setVisibleList(webhooks);
    }
    const saveNickname = async (e, obj) => {
        //  
        const Sip = obj.IP;
        let text = e.currentTarget.innerText
        if (text == "") {
            text = obj.nickname;
            e.currentTarget.innerText = obj.nickname;
        }
        if (obj.nickname != text) {
            await dispatch(updateNickname(Sip, text));
            const copy = [...webhooks];
            const i = copy.findIndex(w => w.IP == Sip);
            const web = { ...copy[i] };
            web.nickname = text;
            copy[i] = web;
            await dispatch(setWebhooksByUser(copy));
        }
    }
    const rowClasses = (row, rowIndex) => {
        let classes = "row-" + row.IP
        return classes
    }
    const copyHandler = (content) => {
        const el = document.getElementById('link');
        el.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => { setCopied(false) }, 2000);
    }
    const MySearch = (props) => {
        let input;
        const searshFor = () => {
            props.onSearch(input.value);
        };
        return (
            <div class="has-search d-flex align-items-center">
                <img class="form-control-feedback searchIcon ml-2" src={search} />
                {/* <i className="fas fa-search"></i> */}
                <input
                    className="form-control ml-1"
                    ref={n => input = n}
                    placeholder="Search..."
                    type="text"
                    onInput={searshFor}
                />
            </div>
        );
    };
    const keyPress = (e, obj) => {
        // debbger
        if (e.key === 'Enter') {
            e.preventDefault();
            saveNickname(e, obj);
        }
        if (e.currentTarget.innerText.length > 20)
            e.preventDefault();
    }

    const columns = [
        //nickname
        {
            events: {
                onClick: (e) => {
                    //  
                    let ele = e.currentTarget.children[0]
                    ele.contentEditable = 'true';
                },
            },
            dataField: "nickname",
            title: "nickname",
            text: allText.webhook.nickname,
            align: "center",
            headerAlign: "center",
            sort: true,
            style: { width: '15%', outline: 'none' },
            formatter: (nickname, obj) => {
                // nickname.substr(0, 20);
                return (
                    <span className="nickname" id={"nickname-" + obj.IP}
                        // onclick={(e) => editNickname(e, obj)} 
                        onBlur={(e) => saveNickname(e, obj)}
                        onKeyPress={(e) => keyPress(e, obj)}>{nickname}</span>
                )
            },
            headerStyle: {
                backgroundColor: '#F5F5FA', position: 'sticky',
                top: '0', height: '5vh', padding: '2vh',
                borderBottomColor: '#dee2e6'
            },
        },
        //source
        {
            dataField: "source",
            title: "source",
            text: allText.webhook.source,
            align: "center",
            headerAlign: "center",
            sort: true,
            style: { width: '15%', cursor: 'default' },
            headerStyle: {
                backgroundColor: '#F5F5FA', position: 'sticky',
                top: '0', height: '5vh', padding: '2vh', borderBottomColor: '#dee2e6'
            },
        },
        //ip
        {
            dataField: "IP",
            title: "ip",
            text: allText.webhook.ip,
            align: "center",
            headerAlign: "center",
            sort: false,
            style: { width: '15%', cursor: 'default' },
            headerStyle: {
                backgroundColor: '#F5F5FA', position: 'sticky',
                top: '0', height: '5vh', padding: '2vh', cursor: 'default',
                borderBottomColor: '#dee2e6'
            },
        },
        //counter
        {
            dataField: "counter",
            title: "",
            text: allText.webhook.counter,
            align: "center",
            headerAlign: "center",
            sort: true,
            style: { width: '15%', outline: 'none' },
            headerStyle: {
                backgroundColor: '#F5F5FA', position: 'sticky',
                top: '0', height: '5vh', padding: '2vh',
                borderBottomColor: '#dee2e6'
            }
        },
        //blocked
        {
            events: {
                onclick: (e) => e.stopPropagation(),
                onDoubleClick: (e) => e.stopPropagation()
            },
            dataField: "blocked",
            title: "blocked",
            text: "Block",
            align: "center",
            headerAlign: "center",
            sort: false,
            style: { width: '15%', fontSize: '12pt', alignItems: "center" },
            formatter: (blocked, obj) => {
                return (
                    <div className="toggler">
                        {/* <Switch onChange={async () => await dispatch(toggleBlock(obj.IP))}
                                checked={blocked} /> */}
                        <label class="switch">
                            <input type="checkbox" class="slide-switch" id={"block-" + obj.IP}
                                //  
                                checked={blocked}
                                onClick={(e) => e.preventDefault()}
                                onChange={async () => await dispatch(toggleBlock(obj.IP))} />
                            <span class="slider round"></span>
                        </label>
                    </div>
                )
            },
            headerStyle: {
                backgroundColor: '#F5F5FA', position: 'sticky',
                top: '0', height: '5vh', padding: '2vh', borderBottomColor: '#dee2e6'
            }
        },
    ];


    return (

        <div className="row gx-5" >
            <div className="col">
                <ToolkitProvider
                    keyField="IP"
                    data={visibleList ? visibleList : []}
                    columns={columns}
                    search>
                    {props => (
                        <>

                            <div className="webhookList">
                                <div className="d-flex example-parent headerWebhook">
                                    <div className="p-2 col-example">
                                        <div className="d-flex example-parent ">
                                            <div className='p-2 col-example col-9'>
                                                <h4 className="p-3 myWebhookHeader"><b>{allText.webhook.webhookList}</b></h4>
                                            </div>
                                            <div className="p-2 col-example">
                                                <Popup trigger={<button className="btn btn-question"><img src={question} /></button>}
                                                    position="right top">
                                                    <div>
                                                        <h3 className="poper">{allText.webhook.howToUseWebhook1}</h3>
                                                        <p className="poper">{allText.webhook.howToUseWebhook2}</p>
                                                        <div class="input-group mb-3 link">
                                                            <input type="text" class="form-control" id="link" editable="false" value={link} style={{ cursor: 'default', height: '35px' }} />
                                                            <div class="input-group-append">
                                                                <button class="btn link-btn" onClick={(e) => copyHandler()} type="submit"><img className="" src={copy} /></button>
                                                            </div>
                                                        </div>
                                                        <p className="poper">{allText.webhook.howToUseWebhook3}</p>
                                                        <p className="poper">{allText.webhook.howToUseWebhook4}</p>
                                                        <p className="poper">{allText.webhook.howToUseWebhook5}</p>
                                                    </div>
                                                </Popup>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="ml-auto p-2 col-example">
                                        <MySearch {...props.searchProps} />
                                        <div className="head mt-3 d-flex flex-row-reverse">
                                            <div class="form-check d-flex align-items-center">
                                                <p class="mr-2 hide">{allText.webhook.hide}</p>
                                                <input type="checkbox" id="hide-Blocked" onChange={(e) => { hideBlocked(e) }} />
                                            </div>
                                        </div>
                                    </div>


                                </div>
        
                                <BootstrapTable
                                    // style={{ top: '10px' }}
                                    loading={false}
                                    rowStyle={{ overfolw: "hidden" }}
                                    bodyStyle={{
                                        tableLayout: "fixed !important",
                                        borderBottomColor: 'currentColor',

                                    }}
                                    rowClasses={rowClasses}
                                    bordered={false}
                                    classes="table-hover contactTable "
                                    wrapperClasses="table-responsive"
                                    noDataIndication={indication}
                                    {...props.baseProps}
                                />
                            </div>
                        </>
                    )
                    }

                </ToolkitProvider>

            </div>
        </div>
    )
}
export default connect(
    (state) => {
        return {
            userName: state.init.userName,
            webhooks: state.init.webhooks,
            systemWaves: state.conversations.systemWaves
        }
    },
    (dispatch) => {
        return {
            // getWebhooks: () => dispatch(getWebhooksByUser()),
            // setWebhooks: () => dispatch(setWebhooksByUser())
        }
    }
)(Webhook)