import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {CButton, CCol, CContainer, CForm, CFormInput, CFormSelect, CRow} from '@coreui/react';
import {BlockchainNetworkType} from './common/enum/network.enum';
import {useSolanaBlockchain} from './hooks/solana';
import {FormContainer, Image, ImageContainer, ImageContainerPlaceholder,} from './styles';
import SolanaImage from './assets/images/solana.png';
import {LAMPORTS_PER_SOL} from '@solana/web3.js';

const selectOptions = [
  {label: 'Devnet', value: BlockchainNetworkType.Devnet},
  {label: 'Testnet', value: BlockchainNetworkType.Testnet},
  {label: 'Mainnet-Beta', value: BlockchainNetworkType.MainNetBeta},
];

const App = () => {
  const [connectionNetwork, setConnectionNetwork] = useState(BlockchainNetworkType.Devnet)
  const {establishConnection, getBalance, error, balance} = useSolanaBlockchain();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);

  useEffect(() => establishConnection(connectionNetwork), [connectionNetwork, establishConnection]);

  const shouldAnimateForward = useMemo(() => !error && balance && !isEditingMode, [isEditingMode, balance, error])
  const shouldAnimateBackward = useMemo(() => !error && isEditingMode && balance, [isEditingMode, error])

  const fetchWalletBalance = useCallback((e: any) => {
    e.preventDefault();
    setIsEditingMode(false);
    getBalance(inputRef.current?.value as string);
  }, [getBalance]);

  const onNetworkChange = useCallback((e: any) => {
    setConnectionNetwork(e.target.value);
  }, [setConnectionNetwork])

  return (
    <FormContainer>
      <CForm onSubmit={fetchWalletBalance}>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol xs={4}>
              <ImageContainerPlaceholder>
                <ImageContainer {...{shouldAnimateForward, shouldAnimateBackward}}>
                  <Image {...{shouldAnimateForward, shouldAnimateBackward}} src={SolanaImage} alt="" />
                </ImageContainer>
              </ImageContainerPlaceholder>
            </CCol>
          </CRow>
          <CRow xs={{ gutterY: 4, cols: 2 }}>
            <CCol xs={3}>
              <CFormSelect ref={selectRef}
                           label="Select network"
                           options={selectOptions}
                           value={connectionNetwork}
                           onChange={onNetworkChange}/>
            </CCol>
            <CCol xs={6}>
              <CFormInput
                ref={inputRef}
                type="text"
                label="Wallet address"
                onKeyUp={(e) => {
                  if (e.key !== 'Enter') {
                    setIsEditingMode(true);
                  }
                }
                }
              />
              <span style={{color: 'red '}}>{error}</span>
              {balance && (
                <span>{balance / LAMPORTS_PER_SOL} SOL</span>
              )}
            </CCol>
            <CCol>
              <CButton type="button" onClick={fetchWalletBalance}>Check balance</CButton>
            </CCol>
          </CRow>
          <CRow>

          </CRow>
        </CContainer>
      </CForm>
    </FormContainer>
  );
}

export default App;
