import React from 'react'


type InputData = {
  name: string;
  description: string;
  type: string;
  required: true;
  default: null;
};

type props = {
  id: string;
  inputData: {
      [key: string]: string | number | File;
  };
  inputs: InputData[];
  response: string;
  avatar?: string;
  type?: string;
}

const ViewPreviousData = (props: props) => {
  return (
    <div className='flex flex-col items-end'>
      <div className='rounded-lg w-3/4 bg-secondary px-4 flex flex-wrap gap-x-8 text-primary items-center py-2'>
        {Object.entries(props.inputData).map((ele) => {
          return <div key={ele[0]} className='flex gap-x-4 items-center' >
            <p>{ele[0]}:</p>
            {typeof ele[1] === 'object' ?<p>{ele[1].name}</p>: <p>{ele[1]}; </p>}
          </div>
        })}
      </div>
      <div className='w-full flex gap-x-2 items-center'>
        <div className='h-16 w-16 p-2'>
          <img src={props.avatar} alt={'avatar'} className='h-full w-full bg-cover'/>
        </div>
        { props?.type === 'image'? <div className='p-2 h-28 w-28'>
          <img src={props.response} alt={props.response}/>
        </div>
        :<div className='p-2'>
          {props.response}
        </div>}
      </div>
    </div>
  )
}

export default ViewPreviousData