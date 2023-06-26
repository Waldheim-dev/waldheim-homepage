import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class WindowRef {
  static nativeWindow(): Window | null {
    return typeof window !== "undefined" ? window : null;
  }
}
