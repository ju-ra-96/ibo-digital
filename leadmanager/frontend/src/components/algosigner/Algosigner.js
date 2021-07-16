/* global AlgoSigner */
import React from 'react'
import './Algosigner.css';
import {Button, Container, Header, Message} from "semantic-ui-react";
import {useState, useCallback} from "react";
import "/Users/julianrahimi/Documents/project-dlt/ibo-digital/node_modules/core-js";
import "/Users/julianrahimi/Documents/project-dlt/ibo-digital/node_modules/regenerator-runtime/runtime";

const Algosigner = () => {
const appId = 13793863;
/**
 * React Component displaying a title, a button doing some (AlgoSigner-related) actions
 * and a message with the result.
 *
 * @param buttonAction is a (potentially async) function called when clicking on the button
 *   and returning the result to be displayed
 */
const ExampleAlgoSigner = ({title, buttonText, buttonAction}) => {
  const [result, setResult] = useState("");

  const onClick = useCallback(async () => {
    const r = await buttonAction();
    setResult(r);
  }, [buttonAction]);

  return (
    <>
      <Header as="h2" dividing>{title}</Header>
      <Button primary={true} onClick={onClick}>{buttonText}</Button>
      <Message>
        <code>
          {result}
        </code>
      </Message>
    </>
  );
};



const CheckAlgoSigner = () => {
  const action = useCallback(() => {
    if (typeof AlgoSigner !== 'undefined') {
      return "AlgoSigner is installed.";
    } else {
      return "AlgoSigner is NOT installed.";
    }
  }, []);

  return <ExampleAlgoSigner title="CheckAlgoSigner" buttonText="Check" buttonAction={action}/>
};

const GetAccounts = () => {
  const action = useCallback(async () => {
    await AlgoSigner.connect({
      ledger: 'TestNet'
    });
    const accts = await AlgoSigner.accounts({
      ledger: 'TestNet'
    });
    return JSON.stringify(accts, null, 2);
  }, []);

  return <ExampleAlgoSigner title="Get Accounts" buttonText="Get Accounts" buttonAction={action}/>
};

const GetParams = () => {
  const action = useCallback(async () => {
    try {
      const r = await AlgoSigner.algod({
        ledger: 'TestNet',
        path: `/v2/transactions/params`
      });
      return JSON.stringify(r, null, 2);
    } catch (e) {
      console.error(e);
      return JSON.stringify(e, null, 2);
    }
  }, []);

  return <ExampleAlgoSigner title="Get Transaction Params" buttonText="Get Transaction Params" buttonAction={action}/>
};

const GetAppGlobalState = () => {
  const action = useCallback(async () => {
    try {
      const r = await AlgoSigner.indexer({
        ledger: 'TestNet',
        path: `/v2/applications/${appId}`
      });
      return JSON.stringify(r, null, 2);
    } catch (e) {
      console.error(e);
      return JSON.stringify(e, null, 2);
    }
  }, []);

  return <ExampleAlgoSigner title="Get Global State" buttonText="Get Global State" buttonAction={action}/>
};

const styles = () => {
    `margin-top: 3em`;
  
}

  return (
    <Container className="algosigner" styles={styles}>
      <Header as="h1" dividing>IBO-DLT AlgoSigner</Header>
      <p>
        Get an overview of your AlgoSign Account
      </p>

      <CheckAlgoSigner/>

      <GetAccounts/>

      <GetParams/>

      <GetAppGlobalState/>

    </Container>
  );
};

export default Algosigner;