import React from "react"
import { global, conf, funcs, atoms } from "nd"

import {
  useRecoilState,
  useRecoilCallback,
  selector,
  useRecoilValue,
  atom
} from "recoil"

import {
  keys,
  compose,
  mergeLeft,
  has,
  assocPath,
  isNil,
  mapObjIndexed,
  map,
  is,
  pick,
  complement,
  forEach,
  both,
  cond
} from "ramda"

import { withRouter } from "next/router"
import setter from "./setter"
import func from "./func"

const isNonArrayObj = both(is(Object), complement(is(Array)))

export default (Component, _arr = [], track) => {
  const arr = is(Array)(_arr) ? _arr : is(Array)(Component.props) ? [] : []
  return withRouter(props => {
    let _props = []
    let _funcs = []
    let _tracks = {}
    const initAtom = (v, init) => {
      if (has(v)(atoms)) {
        _props.push(v)
      } else if (has(v)(funcs)) {
        _funcs.push(v)
      } else {
        _props.push(v)
        atoms[v] = atom({
          key: v,
          default: init
        })
        console.log(`new atom created...${v}`)
      }
    }
    forEach(v => {
      if (isNonArrayObj(v)) {
        const selectors = {}
        mapObjIndexed((v2, key) => {
          if (is(Function)(v2)) {
            const fn = func(v2)
            funcs[key] = fn
            _funcs.push(key)
          } else if (is(Array)(v2) && is(Function)(v2[0])) {
            const fn = func(v2[1], v2[0])
            funcs[key] = fn
            _funcs.push(key)
          } else if (is(Function)(v2.get)) {
            let sel
            if (!has(key)(atoms)) {
              sel = selector({
                key: key,
                get: v2.get(atoms)
              })
              atoms[key] = sel
            } else {
              sel = atoms[key]
            }
            selectors[key] = sel
          } else {
            initAtom(key, v2)
          }
        })(v)
        _tracks = mergeLeft(selectors, _tracks)
      } else if (is(String)(v)) {
        initAtom(v, null)
      } else {
        console.log(`unknow binding type`)
        console.log(v)
      }
    })(arr)
    const { set, binder } = setter(_props)
    let tracker = null
    if (is(String)(track)) {
      const track_name = `${track}$tracker`
      const diff_name = `${track_name}_diff`
      const prev_name = `${track_name}_prev`
      if (!has(diff_name)(atoms)) {
        atoms[diff_name] = atom({ key: diff_name, default: [] })
        atoms[prev_name] = atom({ key: prev_name, default: {} })
      }
      tracker = { diff: atoms[diff_name], prev: atoms[prev_name] }
    }
    return (
      <Component
        tracker={tracker}
        init={() => {
          return mapObjIndexed((v, k) => v())(pick(_funcs)(funcs))
        }}
        conf={conf}
        global={global}
        set={set}
        {...mapObjIndexed((v, k) => useRecoilValue(v))(_tracks)}
        {...map(v => v.get)(binder)}
        {...props}
      />
    )
  })
}
