import { StackingLayers } from './stacking.js';
export interface DomToSvgOptions {
    /**
     * To visual area to contrain the SVG too.
     * Elements that do not intersect the capture area are not included in the SVG.
     */
    captureArea?: DOMRectReadOnly;
    /**
     * Whether to include `<a>` tags in the SVG so links are still interactive.
     *
     * @default true
     */
    keepLinks?: boolean;
}
export interface TraversalContext {
    readonly svgDocument: XMLDocument;
    readonly currentSvgParent: SVGElement;
    readonly parentStackingLayer: SVGGElement;
    readonly stackingLayers: StackingLayers;
    /**
     * Masks for ancestor elements (that are `overflow: hidden`) affecting the current element, from closest to furthest.
     */
    readonly ancestorMasks: {
        mask: SVGMaskElement;
        forElement: Element;
    }[];
    readonly labels: Map<HTMLLabelElement, string>;
    readonly getUniqueId: (prefix: string) => string;
    readonly options: Required<DomToSvgOptions>;
}
export declare function walkNode(node: Node, context: TraversalContext): void;
//# sourceMappingURL=traversal.d.ts.map