import { useState } from 'react';

type SortingProps = {
  sortNames: string[];
  onSortChange: (sortName: string) => void; // <-- передаем только имя сортировки
};

function SortVariants({ sortNames, onSortChange }: SortingProps): JSX.Element {
  const [currentSort, setCurrentSort] = useState(sortNames[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (sortName: string) => {
    setCurrentSort(sortName);
    setIsOpen(false);
    onSortChange(sortName);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {sortNames.map((name) => (
          <li
            key={name}
            className={`places__option ${currentSort === name ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortChange(name)}
          >
            {name}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortVariants;
