import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setDefaultValue = (defaultData) => {
    return {
        type: actionTypes.DEFAULT_VALUE_GAME,
        defaultValue: defaultData
    };
};

export const setRandomWhisky = (whisky) => {
    return {
        type: actionTypes.RANDOM_WHISKY,
        whisky: whisky,
    };
};

export const viewCorrectData = (name) => {
    return {
        type: actionTypes.VIEW_CORRECT_DATA,
        name: name
    };
};

export const testData = (name, value) => {
    return {
        type: actionTypes.TEST_DATA,
        name: name,
        value: value
    };
};

export const loadingData = (status, statusData) => {
    return {
        type: actionTypes.LOADING_DATA,
        status: status,
        statusData: statusData
    };
};

export const fetchDataFailed = () => {
    return {
        type: actionTypes.FETCH_DATA_FAIL
    };
};

export const loadRandomWhisky = () => {
    return dispatch => {
        axios.get('/whisky.json')
            .then(res => {
                const randomWhisky = Math.floor(Math.random() * res.data.length);
                axios.get('/whisky/'+ randomWhisky +'.json')
                    .then(res => {
                        const data = Object.keys(res.data)
                            .map(key => {
                                return res.data[key];
                            });
                        const whisky = { ...data[0] };
                        dispatch(setRandomWhisky(whisky));
                    })
                    .catch(err => {
                        dispatch(fetchDataFailed());
                    })
            })
            .catch(err => {
                dispatch(fetchDataFailed());
            })
    }
};

export const loadDefaultValue = () => {
    return dispatch => {
        dispatch(loadingData(true, true));
        axios.get('/defaultValue.json')
            .then(res => {
                const whisky = { ...res.data.whisky };
                delete res.data.whisky.img;
                const defaultData={
                    correct: res.data.correct,
                    whisky: whisky,
                    value: res.data.whisky,
                    loading: res.data.loading,
                    loadingData: res.data.loadingData,
                    helpInfo: res.data.helpInfo
                };
                dispatch(setDefaultValue(defaultData));
                dispatch(loadRandomWhisky());
            })
            .catch(err => {
                dispatch(fetchDataFailed());
            })
    };
};