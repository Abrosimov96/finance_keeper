import {WalletType} from '../../../App.tsx';
import './Wallet.css'

type WalletProps = {
    wallet: WalletType
};
export const Wallet = ({wallet}: WalletProps) => {
    return (
        <li className={'walletItem'} key={wallet.id}>
            <span>{wallet.title}</span>
            <span>{wallet.currentValue} лв.</span>
        </li>
    );
};