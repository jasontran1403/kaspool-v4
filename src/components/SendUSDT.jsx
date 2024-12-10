import {
  createThirdwebClient,
  prepareTransaction,
  toWei,
} from "thirdweb";
import { bsc } from "thirdweb/chains";
import {
  TransactionButton,
  useActiveAccount,
} from "thirdweb/react";
import TrustWalletConnect from "./TrustWalletConnect";

const client = createThirdwebClient({
  clientId: "c4917b86730652d8197cc695ca2b38eb",
});

const usdtBEP20ContractAddress = "0x55d3ca0cfdb39b54e2cbe20b61bebd494ee06a30";

function App() {
  const account = useActiveAccount();

  return (
    <div className="flex py-12 px-3">
      <div className="m-auto max-w-[550px] text-center">
        <div className="mt-5 mx-auto">
          <TrustWalletConnect />
        </div>
        {account && (
          <TransactionButton
            payModal={{
              theme: "light",
            }}
            style={{ marginTop: "18px" }}
            transaction={() => {
              const transaction = prepareTransaction({
                to: "0x21846483eCCCf80e33185755f08Fc6E10ED0099e",
                chain: bsc,
                client: client,
                value: toWei("0.0005"),
              });

              return transaction;
            }}
          >
            Send 0.0005BNB
          </TransactionButton>
        )}
      </div>
    </div>
  );
}

export default App;