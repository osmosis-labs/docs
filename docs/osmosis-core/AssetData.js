import React, { useState, useEffect } from 'react';

const AssetData = () => {
  const [assets, setAssets] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState('https://raw.githubusercontent.com/osmosis-labs/assetlists/main/osmosis-1/osmosis-1.assetlist.json');

  const assetUrls = {
    mainnet: 'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/osmosis-1/osmosis-1.assetlist.json',
    osmo_test_4: 'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/osmo-test-5/osmo-test-5.assetlist.json',
    osmo_test_5: 'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/osmo-test-5/osmo-test-5.assetlist.json',
  };

  
  const chainButtonStyle = {
    backgroundColor: '#322dc2',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    borderRadius: '8px',
    transition: 'background-color 0.2s ease-in-out', 
    ':hover': {
      backgroundColor: '#5f4bea',
    }
  };
  
  

  useEffect(() => {
    const fetchAssets = () => {
      if (!selectedUrl) return;
      fetch(selectedUrl)
        .then((result) => result.json())
        .then((data) => setAssets(data.assets));
    };
    fetchAssets();
  }, [selectedUrl]);

  const handleUrlChange = (url) => {
    setSelectedUrl(url);
  };

  return (
    <>
      <div> <h3> Select a chain </h3>
        {Object.entries(assetUrls).map(([key, url]) => (
           <button key={key} onClick={() => handleUrlChange(url)} style={chainButtonStyle}>
            {key}
          </button>
        ))}
      </div>
      {assets ? (
        <table>
  <thead>
    <tr>
      <th>
        <code>Name</code>
      </th>
      <th>
        <code>Information</code>
      </th>
    </tr>
  </thead>
  <tbody>
  {assets.map((asset) => (
    <tr key={asset.symbol}>
      <td>{asset.name}</td>
      <td>
        <div>
        <b>Symbol:</b>  {asset.symbol}
          <br /><b>IBC Denom:</b> {asset.base}
        </div>
        {asset.traces?.map((trace, index) => (
          <div key={`${asset.symbol}-trace-${index}`}>
            {trace.provider && <span><b> Provider</b>: {trace.provider}</span>}
            
          <div>
              
              <ul>
                <li> {trace.type}
                  <ul>
                    <li><b>Destination Chain:</b> {trace.counterparty.chain_name} Denom:{trace.counterparty.base_denom}</li>


                    {trace.type === "ibc" ? (
                      <>
                        <li>
                          <b>Destination Channel:</b> {trace.counterparty.channel_id}
                        </li>
                        <li>
                          <b>Source Channel:</b> {trace.chain.channel_id}
                        </li>
                      </>
                    ) : null}

                   
                    <li><b>Base Denom:</b> {trace.counterparty.base_denom}</li>
                  </ul>
                </li>
              </ul>

            </div>

          </div>
        ))}

      </td>
    </tr>
  ))}
</tbody>



</table>
      ) : (
        <h1>Fetching Assets...</h1>
      )}
    </>
  );
};

export default AssetData;


