import TransactionTableV2Mining from "../TransactionTableV2Mining";
import TransactionTableV2Withdraw from "../TransactionTableV2Withdraw";
import TransactionTableV2Claim from "./TransactionTableV2Claim";
import TransactionTableV2Transfer from "./TransactionTableV2Transfer";
const TABLE_HEAD_MINING = ["System Code", "Date", "Amount", "Status"];
const TABLE_HEAD_CLAIM = ["System Code", "Date", "Amount", "Status"];
const TABLE_HEAD_WITHDRAW = ["System Code", "Date", "Amount", "Status", "To"];
const TABLE_HEAD_TRANSFER = ["System Code", "Date", "Amount", "Status", "Note"];

const His = () => {
  const [listTransaction, setListTransaction] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/packages/${localStorage.getItem("walletAddress")}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setListTransaction(response.data.investments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {props.selectedDasTab === "Mining" && (
        <TransactionTableV2Mining
          className="w-full flex justify-center items-center pt-[20px] pb-[20px]"
          TABLE_HEAD={TABLE_HEAD_MINING}
          TABLE_ROWS={listTransaction}
        />
      )}

      {props.selectedDasTab === "Claim" && (
        <TransactionTableV2Claim
          className="w-full flex justify-center items-center pt-[20px] pb-[20px]"
          TABLE_HEAD={TABLE_HEAD_CLAIM}
          TABLE_ROWS={listTransaction}
        />
      )}

      {props.selectedDasTab === "Withdraw" && (
        <TransactionTableV2Withdraw
          className="w-full flex justify-center items-center pt-[20px] pb-[20px]"
          TABLE_HEAD={TABLE_HEAD_WITHDRAW}
          TABLE_ROWS={listTransaction}
        />
      )}

      {props.selectedDasTab === "Transfer" && (
        <TransactionTableV2Transfer
          className="w-full flex justify-center items-center pt-[20px] pb-[20px]"
          TABLE_HEAD={TABLE_HEAD_TRANSFER}
          TABLE_ROWS={listTransaction}
        />
      )}
    </>
  );
};

export default His;
