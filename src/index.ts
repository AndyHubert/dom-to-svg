import { svgNamespace, isSVGImageElement } from './dom.js'
import { fetchAsDataURL } from './inline'
import { walkNode } from './traversal.js'
import { createStackingLayers } from './stacking.js'
import { createCounter } from './util.js'

export * from './serialize.js'

export function documentToSVG(document: Document): XMLDocument {
	const svgDocument = document.implementation.createDocument(svgNamespace, 'svg', null) as XMLDocument

	const svgElement = (svgDocument.documentElement as unknown) as SVGSVGElement
	svgElement.setAttribute('xmlns', svgNamespace)

	walkNode(document.documentElement, {
		svgDocument,
		currentSvgParent: svgElement,
		stackingLayers: createStackingLayers(svgElement),
		parentStackingLayer: svgElement,
		getUniqueId: createCounter(),
		labels: new Map(),
	})

	const bounds = document.documentElement.getBoundingClientRect()
	svgElement.setAttribute('width', bounds.width.toString())
	svgElement.setAttribute('height', bounds.height.toString())
	svgElement.setAttribute('viewBox', `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`)

	return svgDocument
}

export async function inlineResources(element: Element): Promise<void> {
	if (isSVGImageElement(element)) {
		const dataURL = await fetchAsDataURL(new URL(element.href.baseVal))
		element.setAttribute('href', dataURL.href)
	}
	await Promise.all([...element.children].map(inlineResources))
}
