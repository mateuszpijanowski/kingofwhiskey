import React from 'react';
import classes from '../Modal.css';
import { NavLink } from "react-router-dom";

import InputModal from './InputModal/InputModal';
import Spinner from '../../Spinner/Spinner';

const modalEditWhisky = (props) => {
    const capitalize = (string) => (
        string.charAt(0).toUpperCase() + string.slice(1)
    );

    let inputs;
    let nextPage=null;

    if (props.state.loading) {
        inputs=<Spinner />;
    } else {
        const activePage = (path) => {
            return props.state.currentPage === path.toString();
        };

        inputs = Object.keys(props.state.whisky)
            .map(key => {
                return [
                    <div key={key} className={classes.Img}>
                        <p><img
                            src={props.state.whisky[key]['img']}
                            alt="whisky_img" />
                        </p>
                    </div>,
                    Object.keys(props.state.whisky[key])
                        .map(key2 => {
                            if (key2 === 'userId') return null;
                            let editPermission = props.isAdmin;
                            if (props.state.value[key].userId === props.userId) editPermission = true;
                            return (
                                <InputModal
                                    key={key+key2}
                                    changeValue={props.state.changeValue[key][key2]}
                                    value={props.state.value[key][key2]}
                                    name={key2} inputName={capitalize(key2)}
                                    id={props.state.id[key].key}
                                    editPermission={editPermission}
                                    disabled={!props.state.changeValue[key][key2]}
                                    change={editPermission ? (event) => props.change(event, key) : null}
                                    edit={editPermission ? (event) => props.edit(event,key) : null} />
                            );
                        })
                ]
            });

        nextPage=[];
        let page=0;
        for (let i=0; i<props.state.pages; i++) {
            page++;
            nextPage.push(
                <span key={i} onClick={props.changePage}>
                    <NavLink
                        key={page}
                        className={activePage(page) ? classes.Active : null}
                        to={'?'+page}>{page}
                    </NavLink>
                </span>
            );
        }
    }

    return (
        <React.Fragment>
            <div className={classes.EditWhisky}>
                {inputs}
                <div className={classes.Pagination}>
                    {nextPage}
                </div>
            </div>
        </React.Fragment>
    );
};

export default modalEditWhisky;
