// Based on the "babel-plugin-transform-builtin-extend" Babel plugin:
// https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend
//
// The MIT License (MIT)
//
// Copyright (C) 2015 Logan Smyth <loganfsmyth@gmail.com>
// Copyright (C) 2022 thewizardplusplus <thewizardplusplus@yandex.ru>
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const ParentClass = Error

export function HTTPError() {
  if (new.target === undefined) {
    return Reflect.construct(HTTPError, Array.from(arguments))
  }

  const instance = Reflect.construct(ParentClass, Array.from(arguments))
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this))

  return instance
}

HTTPError.prototype = Object.create(ParentClass.prototype, {
  constructor: {
    value: ParentClass,
    configurable: true,
    enumerable: false,
    writable: true,
  },
  name: {
    value: HTTPError.name,
    configurable: true,
    enumerable: false,
    writable: true,
  },
})
Object.setPrototypeOf(HTTPError, ParentClass)
