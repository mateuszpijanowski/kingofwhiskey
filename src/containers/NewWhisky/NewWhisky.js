import React, { PureComponent } from 'react';
import axios from 'axios';

import withErrorHandler from '../../hoc/withErrorHandler';
import ModalAddWhisky from '../../components/UI/Modal/ModalAddWhisky/ModalAddWhisky';
import Validation from '../../components/ValidationSystem/ValidationSystem';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class NewWhisky extends PureComponent {
    componentDidMount() {
        this.props.onDefaultValue();
    };

    confirmDataHandler = (event) => {
        let confirmStateCopy = { ...this.props.state.confirm };

        if (Validation(this.props.state.validation[event.target.name], this.props.state.whisky[event.target.name])) {
            confirmStateCopy[event.target.name]=1;
            this.props.onConfirmData(confirmStateCopy);
        } else {
            confirmStateCopy[event.target.name]=0;
            this.props.onConfirmData(confirmStateCopy);
        }

        confirmStateCopy = Object.keys(confirmStateCopy)
            .map(key => {
                return confirmStateCopy[key]
            });

        let confirmSum = confirmStateCopy
            .reduce((confirmStateCopy, el) => {
                return confirmStateCopy + el;
            }, 0);

        if (confirmSum===confirmStateCopy.length && confirmSum>1) {
            this.props.onAddNewWhisky(this.props.state.whisky);
        }
    };

    render() {
        return (
            <div>
                <ModalAddWhisky
                    state={this.props.state}
                    confirmData={this.confirmDataHandler}
                    updateData={(event) => this.props.onUpdateNewWhiskyData(event.target.name, event.target.value)} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state.newWhisky,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDefaultValue: () => dispatch(actions.loadDefaultValueNW()),
        onAddNewWhisky: (newWhisky) => dispatch(actions.putNewWhisky(newWhisky)),
        onUpdateNewWhiskyData: (name, value) => dispatch(actions.updateNewWhiskyData(name, value)),
        onConfirmData: (confirm) => dispatch(actions.confirmData(confirm))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(NewWhisky, axios));
