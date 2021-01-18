import React from "react";
import {useStoreState} from "easy-peasy";
import {isEmpty, useFirebase} from "react-redux-firebase";
import {Link, useHistory} from 'react-router-dom';
import styled, {css} from 'styled-components';
const AppHeader = styled.div`
  padding: 0.5em;
  height: 3em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  background: linear-gradient(to bottom, #FFFFFF00, #FFFFFF09);
  border-bottom: 1px solid #FFFFFF2F;
`

const LoggedInMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`
const headerLinkStyles = css`
  margin: 0.4em;
  padding-bottom: 0.1em;

  :hover {
    border-bottom: 0.1em white solid;
  }
`
const AppHeaderLink = styled(Link)`
  ${headerLinkStyles};
`

const AppHeaderAnchor = styled.a`
  ${headerLinkStyles};
`

const AppBody = styled.div`
  padding: 1em;
  
  @media(max-width: 450px){
    padding: 0;
  }
`

export const AppContainer = (props) => {
    const auth = useStoreState(state => state.firebase.auth);
    const profile = useStoreState(state => state.firebase.profile);
    const firebase = useFirebase();
    const history = useHistory();

    const logOut = async () => {
        await firebase.logout();
        history.push('/')
    }

    return (<React.Fragment>
        <AppHeader>
            <h3>
                <Link to={isEmpty(auth) ? '/': '/home'}>
                        ledger.bet
                </Link>
            </h3>
            <LoggedInMenu>
                {isEmpty(auth)
                    ? <AppHeaderLink to='/login'>
                        Log In
                    </AppHeaderLink>
                    : <React.Fragment>
                        <AppHeaderLink to="/home">
                            <i className="fas fa-home"/>
                        </AppHeaderLink>
                        <AppHeaderLink to="/wagers/new">
                            Make a Wager
                        </AppHeaderLink>
                        <AppHeaderAnchor onClick={logOut}> Sign Out </AppHeaderAnchor>
                    </React.Fragment>
                }
            </LoggedInMenu>
        </AppHeader>
        <AppBody ref={props.bodyRef}>
            {props.children}
        </AppBody>
    </React.Fragment>)
}
