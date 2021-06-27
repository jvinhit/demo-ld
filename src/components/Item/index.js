import React, { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';

import { CONFIG } from '../../utils/config';
import styles from './index.less';
import ModalInput from './ModalInput';

export const Item = props => {
  const { data, dataKey, width, change, changeColumns, source, columnInfo } = props;
  return (
    <Template
      width={width}
      label={data[dataKey]}
      dataKey={dataKey}
      columnInfo={columnInfo}
      change={change}
      changeColumns={changeColumns}
      source={source}
      data={data}
    />
  );
};

const Template = React.memo((props) => {
  const {
    width,
    label,
    dataKey,
    change,
    source,
    data,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const [showInput, setShowInput] = useState(false);
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState('');
  const [anchorInf, setAnchorInf] = useState(null);
  const inputRef = useRef(null);

  const gridContainer = document.getElementsByClassName(CONFIG.GRID_CONTAINER_CLASS_NAME)[0];

  const show = () => {
    setShowInput(true);
    setSelected(false);
  };

  const hideInput = useCallback(() => {
    setShowInput(false);
  }, []);

  const hideSelected = useCallback(() => {
    setSelected(false);
  }, []);

  useEffect(() => {
    const hideCallback = () => {
      if (!value) return;
      const updateIndex = source.findIndex(current => current.rowId === data.rowId);
      if (source[updateIndex][dataKey] !== value) {
        source[updateIndex][dataKey] = value;
        change(source);
      }
      setValue('');
    };

    if (showInput) {
      gridContainer.addEventListener('scroll', hideInput);
      document.addEventListener('click', hideInput);
    } else {
      hideCallback();
      gridContainer && gridContainer.removeEventListener('scroll', hideInput);
      document.removeEventListener('click', hideInput);
    }
    return () => {
      gridContainer && gridContainer.removeEventListener('scroll', hideInput);
      document.removeEventListener('click', hideInput);
    };
  }, [showInput, hideInput, gridContainer, change, data, source, dataKey, value]);

  useEffect(() => {
    if (selected) {
      document.addEventListener('click', hideSelected);
    } else {
      document.removeEventListener('click', hideSelected);
    }
    return () => {
      document.removeEventListener('click', hideSelected);
    };
  }, [selected, hideSelected]);

  const doubleClick = useCallback(e => {
      if (showInput) {
        hideInput();
        return;
      }
      const { top, left, width, height } = e.target.getBoundingClientRect();
      setAnchorInf({ top, left, width, height });
      show();
      setValue(label);
    }, [hideInput, label, showInput]
  );

  const inputChange = e => {
    setValue(e.target.value);
  };

  const editorBox = () => {
    return (
      <div className={styles.input} style={{ ...anchorInf, width }}>
        <input
          style={{width: anchorInf?.width, height: anchorInf.height}}
          className={classNames({[styles.active]: showInput })}
          ref={inputRef}
          placeholder={label}
          value={value}
          onClick={e => e.nativeEvent.stopImmediatePropagation()}
          onKeyDown={ e => e.key === 'Enter' &&  hideInput()}
          onChange={inputChange}
        />
      </div>
    );
  };

  return (
    <>
      { showInput ? null :
        <div
          key={dataKey}
          className={classNames(styles.cell, { [styles.selected] : selected })}
          style={{width}}
          onClick={() => setSelected(!selected)}
          onDoubleClick={doubleClick}
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}>
          {label}
        </div>
      }
      { <ModalInput visible={showInput}>{showInput && editorBox()}</ModalInput> }
    </>
  )
});
