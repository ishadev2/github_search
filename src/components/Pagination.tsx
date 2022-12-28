const Pagination = (props: any): JSX.Element => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.resCount / Number(process.env.REACT_APP_PER_PAGE_COUNT)); i++) {
    pageNumbers.push(<span key={i}> {i} </span>);
  }

  return <div>{pageNumbers}</div>;
};

export default Pagination;
