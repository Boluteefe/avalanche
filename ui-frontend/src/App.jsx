import { useContext, useEffect, useState } from 'react';
import './App.css';
import WalletContext from './context/WalletContext';

function App() {
  const { account, connectWallet, contract } = useContext(WalletContext);
  const [wish, setWish] = useState('');
  const [refetch, setRefetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [wisher, setWisher] = useState('');

  useEffect(() => {
    if (contract && refetch) {
      contract.showWish().then((data) => {
        setWish(data);
        setRefetch(false);
      });
    }
  }, [refetch, contract]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const newWish = e.target.wish.value;
    e.target.wish.value = "";
    const set = await contract.makeNewWish(newWish);
    await set.wait();
    setLoading(false);
    setRefetch(true);
  };

  const checkWisher = async () => {
    const wisherAddress = await contract?.checkWisher();
    console.log(wisherAddress);
    setWisher(wisherAddress);
  };

  return (
    <>
      {account ? (
        <>
          <p>Current wish: {wish}</p>

          <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "20px"}}>
            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
              <label htmlFor="wish">Make a wish:</label>
              <input
                type="text"
                name="wish"
                id="wish"
                style={{padding: "5px"}}
              />
            </div>
            <button type="submit">{loading ? "Updating" : "Update wish"}</button>
          </form>

          <div style={{display: "flex", flexDirection: "column"}}>
          <p style={{marginBottom: "0"}}>Wisher Address: </p>
          <p>{wisher}</p>
          </div>
          <button onClick={checkWisher}>Show wisher</button>

        </>
      ) : (
        <button onClick={connectWallet}>Connect</button>
      )}
    </>
  );
}

export default App;
