import * as React from 'react'
import { connect } from 'react-redux'
import { IStore } from '../../store/reducers/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import { AuthActions } from '../../store/actions/auth';
import { IUserReducer } from '../../store/reducers/userReducer';
import { Redirect } from 'react-router-dom';

const PrivateWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  appIsLoading: boolean,
  user: IUserReducer
  actions: { [key: string]: any}
}

export class PrivateRoute extends React.Component<IProps, any> {

  componentDidMount () {
    this.props.actions.loadCurrentUser();
  }

  render() {
      if (!this.props.appIsLoading && !this.props.user) {
        return <Redirect to="/login" />
      }

      return (
        <PrivateWrapper className="private-wrapper">
          { this.props.appIsLoading || !this.props.user ? <CircularProgress size={50} /> : 
            <React.Fragment>
              { this.props.children }
            </React.Fragment> 
          }
        </PrivateWrapper>
      )
  }
}

const mapStateToProps = ({ app, user }: IStore) => ({
  appIsLoading: app.isLoading,
  user
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadCurrentUser() { dispatch(AuthActions.isUserAuth()) }
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
