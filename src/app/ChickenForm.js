import { useState } from "react";
import PropTypes from "prop-types"

const ChickenForm = ({isEdit=false, chicken = {}, onCreate = ()=>{}, onDelete = ()=>{}, onUpdate = () => {}, onClose= () =>{}}) => {
    const [name, setName] = useState(undefined);
    const [weight, setWeight] = useState(chicken?.weight);
    const [birthday, setBirthday] = useState(undefined);
    const [steps, setSteps] = useState(chicken?.steps);
    const [isRunning, setIsRunning] = useState(chicken?.isRunning);

    return (
        <div>
            <br/>
            <br/>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="floating_name"
                        id="floating_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        onChange={(e) => (setName(e.target.value))}/>
                    <label
                        htmlFor="floating_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {chicken.name ? chicken.name : "Name"}
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="floating_weight"
                        id="floating_weight"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        onChange={(e) => (setWeight(e.target.value))}/>
                    <label
                        htmlFor="floating_weight"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Weight: {chicken.weight ? chicken.weight : 0}
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                    type="text"
                    name="floating_steps"
                    id="floating_steps"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={(e) => (setSteps(e.target.value))}/>
                    <label
                        htmlFor="floating_steps"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Steps: {chicken.steps ? chicken.step : 0}
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="datetime-local"
                        name="floating_birthday"
                        id="floating_birthday"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        onChange={(e) => (setBirthday(e.target.value))}/>
                    <label 
                        htmlFor="floating_birthday"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Birthday: {chicken.birthday ? chicken.birthday : null}
                    </label>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        checked={isRunning}
                        id="default-checkbox"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) => {setIsRunning(!isRunning);}}/>
                    <label
                        htmlFor="default-checkbox"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Is running
                        </label>
                </div>
            {isEdit && (
                <>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={(e) => {onUpdate(name, weight, birthday, steps, isRunning, chicken?._id)}}>
                        Update
                </button>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={(e) => onDelete(id)}>
                        Delete
                </button>
                </>
            )}
            {!isEdit &&
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {onCreate(name, weight, birthday, steps, isRunning)}}>
                        Create
                </button>
            }
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={onClose}>
                    Close
                </button>
            
        </div>
    )
};

ChickenForm.PropTypes = {
    isEdit: PropTypes.bool,
    chicken: PropTypes.object,
    onCreate: PropTypes.func,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    onClose: PropTypes.func
}

export default ChickenForm;