import { Directive, Input, ComponentRef, ElementRef, ComponentFactoryResolver, ViewContainerRef, Renderer2, Inject, HostListener, ɵɵstylePropInterpolateV } from '@angular/core';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { AnimationBuilder, AnimationMetadata, style, animate, AnimationPlayer } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

import { IPhoto, IContentOptions } from 'src/app/shared/model';

@Directive({
    selector: '[appToolTip]',
})

export class ToolTipDirective {
    private isClear: boolean = true;

    @Input() public photoInfo: IPhoto;


    parentWidth: number;
    elCoordinates: number[];
    parentCoordinates: number[];
    elSize: number[];
    player: AnimationPlayer;
    child: ElementRef<any>;
    animationDuration: number = 1000;

    private contentCmpRef: ComponentRef<any>;

    constructor(private el: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2,
        private builder: AnimationBuilder,
        @Inject(DOCUMENT) private document: any) {
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.isClear = false;
        this.buildTooltip();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.isClear = true;
        this.hideTooltip();
    }

    private buildTooltip() {
        const elParameters = this.el.nativeElement.getBoundingClientRect();
        const offsetY = this.el.nativeElement.offsetTop;  
        const parentParameters = this.el.nativeElement.parentNode.getBoundingClientRect();
        const options = this.createContentOptions(elParameters, parentParameters, offsetY);
        this.showTooltip(options);
    }

    private createContentOptions(elParameters: any, pParameters: any, offsetY: number): IContentOptions {
        const wHeight = this.document.documentElement.clientHeight;
        let options: IContentOptions;
        if (elParameters['bottom'] < (wHeight * 0.75)) {
            options = {
                class: false,
                x: pParameters['left'] + window.scrollX,
                y: elParameters['height'] + offsetY,
                width: this.getLastChildX(),
                pointerX: elParameters['width'] * 0.5 + elParameters['left'] - pParameters['left'],
            }
        } else {
            options = {
                class: true,
                x: pParameters['left'] + window.scrollX,
                y:  offsetY,
                width: this.getLastChildX(),
                pointerX: elParameters['width'] * 0.5 + elParameters['left'] - pParameters['left'],
            }
        }
        return options;
    }

    private showTooltip(options: IContentOptions) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ToolTipComponent);
        this.contentCmpRef = this.viewContainerRef.createComponent(componentFactory);
        this.contentCmpRef.instance.options = options;
        this.contentCmpRef.instance.photoInfo = this.photoInfo;
        this.renderer.addClass(this.el.nativeElement, 'selected');
        this.child = this.contentCmpRef.location.nativeElement;
        this.renderer.appendChild(this.el.nativeElement, this.child);
        this.doAnimate();
    }

    private hideTooltip() {
        this.renderer.removeClass(this.el.nativeElement, 'selected');
         this.doAnimate();
    }


    private getLastChildX(): number {
        const parentEl = this.el.nativeElement.parentNode;
        const parentLeftCoordinate = parentEl.getBoundingClientRect()['left'];
        const elWidth = this.el.nativeElement.offsetWidth;
        const elsInRow = this.elementsInRow();
        const lastChildX = parentEl.children[elsInRow].getBoundingClientRect()['left'] + elWidth;
        return lastChildX - parentLeftCoordinate;
    }

    private elementsInRow() {
        const children = this.el.nativeElement.parentNode.children;
        let amount = children.length;
        for (let i = 0; i < children.length - 1; i++) {
            const x1 = children[i].getBoundingClientRect()['left'];
            const x2 = children[i + 1].getBoundingClientRect()['left'];
            if (x2 < x1) {
                return i;
            }
        }
        return amount - 1;
    }

    private doAnimate() {
        const metadata = !this.isClear ? this.fadeIn() : this.fadeOut();
        const factory = this.builder.build(metadata);
        const player = factory.create(this.child);
        if (this.isClear) {
            player.onDone(() => this.renderer.removeChild(this.el.nativeElement, this.el.nativeElement.children[1]));
        }
        player.play();

    }

    private fadeIn(): AnimationMetadata[] {
        const str = this.animationDuration + 'ms ease-in';
        return [
            style({ opacity: 0 }),
            animate(str, style({ opacity: 1 })),
        ];
    }

    private fadeOut(): AnimationMetadata[] {
        const str = this.animationDuration * 0.9 + 'ms ease-in';
        return [
            style({ opacity: 1 }),
            animate(str, style({ opacity: 0 })),
        ];
    }

}