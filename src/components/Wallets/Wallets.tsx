import {WalletType} from '../../App.tsx';
import {Wallet} from './Wallet/Wallet.tsx';
import './Wallets.css'

type WalletsProps = {
    wallets: WalletType[]
};
export const Wallets = ({wallets}: WalletsProps) => {
    return (
        <div className={'revenues'}>
            <ul className={'walletList'}>
                {
                    wallets.map(wallet => <Wallet key={wallet.id} wallet={wallet}/>)
                }
            </ul>
        </div>
    );
};