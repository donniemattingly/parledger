import {useParams} from 'react-router-dom';
import {useStoreState} from 'easy-peasy';
import {SquaresPool} from './SquaresPool';
import {useFirestoreConnect} from 'react-redux-firebase';
import {LoadingImage} from '../SplashScreen';
import {PropsPool} from './PropsPool';

export const PoolsPage = (props) => {
    let { poolId } = useParams();
    const profile = useStoreState(state => state.firebase.profile);
    const activeGroup = useStoreState(state => state.users.activeGroup);
    useFirestoreConnect([{collection: `groups/${activeGroup}/pools`, storeAs: 'pools'}]);
    const pools = useStoreState(state => state.firestore.data.pools);

    if(!pools){
        return <LoadingImage/>
    }

    const pool = pools[poolId];

    console.log(pools, pool);

    if(pool.optionsType === 'squares'){
        return <SquaresPool pool={pool}/>
    } else if(pool.optionsType === 'bovada'){
        return <PropsPool pool={pool}/>
    } else {
        return <div>
            Whoops, I don't know how to handle this pool.
        </div>
    }
}