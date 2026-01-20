
const Title = (props) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3 flex-wrap'>
      <p className='text-gray-500'>
        {props.title1} 
        <span className='text-gray-700 font-medium pl-2'>
            {props.title2}
        </span>
      </p>
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700 text-center'></p>
    </div>
  )
}

export default Title
