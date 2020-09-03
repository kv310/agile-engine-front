import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Accordion, Card, Button} from 'react-bootstrap';


function App() { // I prefer to use hooks and state over classes
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        (async () => {
            // Get the balance from the api
            let bal = await fetch("http://localhost:3000");
            bal = await bal.json();
            setBalance(bal);
        
            // Get the transactions from the api
            let trans = await fetch("http://localhost:3000/transactions");
            trans = await trans.json();
            setTransactions(trans);
        })();
    }, []);

    return (
        <>
            <header> Hello! Your balance is { balance } </header>
            <main>
                <Accordion>
                    { transactions.map(transaction => {
                        return (
                            // Here I should make a new component
                            // but for sake of simplicity I put all here
                            <Card key={transaction.id}>
                                <Card.Header>
                                    <Accordion.Toggle 
                                        as={Button} 
                                        variant="link" 
                                        eventKey={transaction.id}
                                        className={transaction.type == 'credit' ? 'credit' : 'debit'}
                                    >
                                        {transaction.type}: USD {transaction.amount}
                                   </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={transaction.id}>
                                    <Card.Body> 
                                        <div> State: Successful </div>
                                        <div> Id of transaction: {transaction.id} </div>
                                        <div> Date of transaction: {transaction.effectiveDate} </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        );
                    })}
                </Accordion>
            </main>
        </>
  );
}

export default App;
