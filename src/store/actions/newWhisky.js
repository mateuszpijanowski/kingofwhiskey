import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setDefaultValue = (defaultValue) => {
    return {
        type: actionTypes.DEFAULT_VALUE_NEW,
        defaultValue: defaultValue
    };
};

export const updateNewWhiskyData = (name, value) => {
    return {
        type: actionTypes.UPDATE_NEW_WHISKY,
        name: name,
        value: value
    };
};

export const confirmData = (confirm) => {
    return {
        type: actionTypes.CONFIRM_DATA,
        confirm: confirm
    };
};

export const loading = (status) => {
    return {
        type: actionTypes.LOADING_NEW,
        status: status
    };
};

export const fetchDataFailed = () => {
    return {
        type: actionTypes.FETCH_DATA_FAIL_NEW
    };
};

export const putNewWhisky = (newWhisky) => {
    return dispatch => {
        dispatch(loading(true));
        axios.get('/whisky.json')
            .then(res => {
                const nextRecord = res.data.length;
                axios.post('/whisky/' + nextRecord + '.json', newWhisky)
                    .then(res => {
                        dispatch(loadDefaultValueNW());
                    })
                    .catch(err => {
                        dispatch(loadDefaultValueNW());
                        dispatch(fetchDataFailed());
                    })
            })
            .catch(err => {
                dispatch(fetchDataFailed());
            })
    };
};

export const loadDefaultValueNW = () => {
    return dispatch => {
        dispatch(loading(true));
        axios.get('/defaultValue.json')
            .then(res => {
                const defaultData={
                    validation: res.data.validation,
                    confirm: res.data.confirm,
                    whisky: res.data.whisky,
                    loading: res.data.loading,
                    loadingData: res.data.loadingData
                };
                dispatch(setDefaultValue(defaultData));
            })
            .catch(err => {
                dispatch(fetchDataFailed());
            })
    };
};
