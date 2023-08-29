import axios from 'axios';
import { useState, useCallback } from 'react';
import '../app/globals.css';
import ChickenForm from '../app/ChickenForm';

const { default: Head } = require('next/head');

function Index() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(undefined);
  const [chicken, setChicken] = useState(undefined);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [message, setMessage] = useState(undefined);

  const closeForm = useCallback(() => {
    setChicken(undefined);
    setIsCreateMode(false);
  }, [setChicken, setIsCreateMode]);

  const printChicken = () => (
    <ul className="w-full">
      {searchResults.map((chickenInfo) => (
        <li key={chickenInfo._id} className="w-full shadow-lg shadow-cyan-500/50">
          <button className="w-full text-left p-4" onClick={() => { setChicken(chickenInfo); setSearchResults(undefined); }}>
            {chickenInfo.name}
          </button>
        </li>
      ))}
    </ul>
  );

  const handleSearch = useCallback(async (newSearch) => {
    setSearch(newSearch);
    try {
      if (newSearch === '') {
        setSearchResults(undefined);
        return;
      }
      const res = await axios.get(`/chicken/${newSearch}`);
      setSearchResults(res.data.chickens);
      setMessage(res.data.message);
    } catch (e) {
      setMessage(e.response.data.message);
    }
  }, [setSearch, setSearchResults, setMessage]);

  const updateChicken = useCallback(async (name, weight, birthday, steps, isRunning, id) => {
    try {
      const payload = {
        id,
        name,
        weight,
        birthday,
        steps,
        isRunning,
      };

      if (!payload.name || !payload.weight || !payload.birthday || !payload.steps) {
        const ret = await axios.patch('/chicken', payload);
        setMessage(ret.data.message);
      } else {
        const ret = await axios.put('/chicken', payload);
        setMessage(ret.data.message);
      }
    } catch (e) {
      setMessage(e.response.data.message);
    }
  }, [setMessage]);

  const deleteChicken = useCallback(async (id) => {
    try {
      const ret = await axios.delete(`/chicken?id=${id}`);
      setMessage(ret.data.message);
      setChicken(undefined);
    } catch (e) {
      setMessage(e.response.data.message);
      setChicken(undefined);
    }
  }, [setMessage]);

  const createChicken = useCallback(async (name, weight, birthday, steps, isRunning) => {
    try {
      const payload = {
        name,
        weight,
        birthday,
        steps,
        running: isRunning,
      };
      const ret = await axios.post('/chicken', payload);

      setMessage(ret.data.message);
    } catch (e) {
      setMessage(e.response.data.message);
    } finally {
      setIsCreateMode(false);
    }
  }, [setMessage, setIsCreateMode]);

  return (
    <>
      <Head>
        ChickenFingerSnap
      </Head>
      <main>
        <input
          type="text"
          className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
          id="floatingInput"
          value={search}
          placeholder="Search for a chicken"
          onChange={(e) => { handleSearch(e.target.value); }}
        />
        <label
          htmlFor="floatingInput"
          className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          Find a chicken
        </label>
        {
                message
                && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">{message}</strong>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => { setMessage(undefined); }}>
                    <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
                )
            }
        {
                !isCreateMode
                && (
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => { setIsCreateMode(true); }}
                >
                  Or create one
                </button>
                )
            }
        {
                isCreateMode
                && (
                <ChickenForm
                  isEdit={false}
                  onCreate={createChicken}
                  onClose={closeForm}
                />
                )
            }
        {
                searchResults && printChicken()
            }
        {
                chicken
                && (
                <ChickenForm
                  isEdit
                  chicken={chicken}
                  onDelete={deleteChicken}
                  onUpdate={updateChicken}
                  onClose={closeForm}
                />
                )
            }
      </main>
    </>
  );
}

export default Index;
