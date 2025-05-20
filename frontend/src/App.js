import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import FilterPanel from './components/FilterPanel';
import ResultView from './components/ResultView';
import { fetchPowerData } from './api/powerAPI';
import './pagination.css';


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
  const PER_PAGE = 30;

  const handleFetch = async ({ from, to, days, type, loadType, view, stat }) => {
    setLoading(true);
    try {
      const result = await fetchPowerData({ from, to, days, type, loadType, view, stat });
      setData(result);
      setCurrentPage(0); // Reset to first page on new search
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const pageCount = Math.ceil(data.length / PER_PAGE);

  const mappedData = (view)=>{

    if(view === 'list'){
      const offset = currentPage * PER_PAGE;
      return data && data.slice(offset, offset + PER_PAGE);
    }
    return data;
  }

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>Steel Industry Power Analysis</h1>
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
        <p>Loading...</p>
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

          <ResultView data={mappedData(view)} view={view} type={type} loadType={loadType} stat={stat} prePage={PER_PAGE} />

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
    </div>
  );
};

export default App;
