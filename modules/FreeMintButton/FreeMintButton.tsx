import { useAppDispatch, useAppSelector } from "@/common/redux/store"
import { listToken, mintToken, selectCollectionTokenInteractionStatus, showListToken } from "../Collection/Token/token.slice"
import { Network } from '../../common/types'
import { FREE_MINT_TOKEN_ID } from "@/common/config"
import { signer } from "@/common/web3"
import { useWallet } from "@/common/useWallet"

const FreeMintButton = ({disabled, contractAddress, className = "", onError, onSuccess, amountToMint, children}) => {
    const dispatch = useAppDispatch()
    const { address } = useWallet()
    const { status: tokenInteractionStatus } = useAppSelector(selectCollectionTokenInteractionStatus)
    const loading = tokenInteractionStatus === "pending"
    const canNotFreeMint = loading || disabled

    const freeMint = async () => {  
        try {
            if (!signer) return 
            await dispatch(
                mintToken({
                    contract: contractAddress,
                    address,
                    tokenId: `${FREE_MINT_TOKEN_ID}`,
                    network: Network.SEPOLIA,
                    amount: amountToMint,
                }),
            )
            // onSuccess()
        } catch(error) {
            onError()
        }
    }

    return (
        <button
            type="button"
            onClick={freeMint}
            className={`${className} ${canNotFreeMint ? "cursor-not-allowed" : ""}`}
            disabled={canNotFreeMint}
        >        
            {loading ? "Minting..." : children}
        </button>
    )
}

export default FreeMintButton