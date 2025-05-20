import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import FilterPanel from './components/FilterPanel';
import ResultView from './components/ResultView';
import { fetchPowerData } from './api/powerAPI';
import './pagination.css'; // Keep your pagination CSS or migrate to styled-components if desired

const AppContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoadingText = styled.p`
  text-align: center;
`;

const PER_PAGE = 30;

const App = () => {
  const [from, setFrom] = useState('2018-01-01');
  const [to, setTo] = useState('2018-03-31');
  const [days, setDays] = useState([]);
  const [type, setType] = useState('Usage_kWh');
  const [loadType, setLoadType] = useState('');
  const [view, setView] = useState('list');
  const [stat, setStat] = useState('sum');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleFetch = async (filters) => {
    setLoading(true);
    try {
      const result = await fetchPowerData(filters);
      setData(result);
      setCurrentPage(0); // Reset page to first on new search
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const pageCount = Math.ceil(data.length / PER_PAGE);

  const getPagedData = () => {
    if (view !== 'list') return data;
    if (!Array.isArray(data)) return []; // Return empty array if data is not an array
    const offset = currentPage * PER_PAGE;
    return data.slice(offset, offset + PER_PAGE);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <AppContainer>
      <Title>Steel Industry Power Analysis</Title>

      <FilterPanel
        from={from}
        to={to}
        days={days}
        type={type}
        loadType={loadType}
        view={view}
        stat={stat}
        onFromChange={setFrom}
        onToChange={setTo}
        onDaysChange={setDays}
        onTypeChange={setType}
        onLoadTypeChange={setLoadType}
        onViewChange={setView}
        onStatChange={setStat}
        onSubmit={() => handleFetch({ from, to, days, type, loadType, view, stat })}
      />

      {loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <>
          {view === 'list' && data.length > PER_PAGE && (
            <ReactPaginate
              previousLabel={'← Previous'}
              nextLabel={'Next →'}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
            />
          )}

          <ResultView data={getPagedData()} view={view} type={type} loadType={loadType} stat={stat} />

          {view === 'list' && data.length > PER_PAGE && (
            <ReactPaginate
              previousLabel={'← Previous'}
              nextLabel={'Next →'}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
            />
          )}
        </>
      )}
    </AppContainer>
  );
};

export default App;
