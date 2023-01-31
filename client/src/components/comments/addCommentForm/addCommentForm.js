import { useState } from 'react';
import { usernameValidator, emailValidator } from './validator';
import validator from 'validator'

export const AddCommentForm = ({send}) => {
    const [usernameValid, setUsernameValid] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const sendData = (e) => {
        e.preventDefault()
        if(emailValid && usernameValid){
            const data = {
                username: e.currentTarget.elements.username.value,
                email: e.currentTarget.elements.email.value,
                homepage: e.currentTarget.elements.homepage.value,
                comment: e.currentTarget.elements.comment.value
            }
            send(data);
            e.currentTarget.elements.username.value = '';
            e.currentTarget.elements.email.value = '';
            e.currentTarget.elements.homepage.value = '';
            e.currentTarget.elements.comment.value = '';
        }
    }
    const validatorUsername = (e) => {
        e.target.value.length > 5 ? setUsernameValid(true) : setUsernameValid(false)
    }
    const validatorEmail = (e) => {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        regex.test(e.target.value) ? setEmailValid(true) : setEmailValid(false)
        console.log(emailValid)
    }
    return (
        <div className='mb-5'>
            <div class="w-full">
                <form class="w-full max-w-lg mx-auto" onSubmit={sendData}>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                User Name
                            </label>
                            <input onChange={validatorUsername} class={`appearance-none block w-full bg-gray-200 text-gray-700 border ${usernameValid ? '' : 'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="username" type="text" />
                            <p class={`text-red-500 text-xs ${usernameValid ? 'hidden' : ''} italic`}>Please fill out this field.</p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                E-mail
                            </label>
                            <input onChange={validatorEmail} class={`appearance-none block w-full bg-gray-200 text-gray-700 border ${emailValid ? '' : 'border-red-500'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="email" type="text" />
                            <p class={`text-red-500 text-xs ${emailValid ? 'hidden' : ''} italic`}>Incorrect email.</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Home Page
                            </label>
                            <input id="homepage" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Text
                            </label>
                            <textarea id="comment" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" />
                        </div>
                    </div>
                    <div class="md:flex md:items-center">
                        <div class="mx-auto">
                            <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                Comment
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}