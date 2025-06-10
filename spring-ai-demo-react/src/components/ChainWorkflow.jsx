import { useState } from 'react';
import './style/chainWorkflow.css';
function ChainWorkflow() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:8080/chain-workflow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: input,
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.text();
            setResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app">
            <h1>Demo Chain Workflow</h1>

            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Insert prompt..."
                    rows={5}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'building...' : 'Invia'}
                </button>
            </form>

            {error && <div className="error">{error}</div>}

            {response && (
                <div className="response">
                    <h2>Response:</h2>
                    <pre>{response}</pre>
                </div>
            )}
        </div>
    );
}

export default ChainWorkflow;