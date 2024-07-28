
export interface JSOGObject {
  [key: string]: any;
  '@id'?: string;
  '@ref'?: string;
}

export class JSOGDeserializer {
  private objectMap: { [id: string]: JSOGObject } = {};

  public deserialize(jsog: JSOGObject): Event {
    // First pass: store all objects with @id
    this.storeObjectById(jsog);

    // Second pass: resolve all @ref
    return this.resolveReferences(jsog) as Event;
  }

  private storeObjectById(obj: JSOGObject) {
    if (obj['@id']) {
      this.objectMap[obj['@id']] = obj;
    }

    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.storeObjectById(obj[key]);
      }
    }
  }

  private resolveReferences(obj: JSOGObject): JSOGObject {
    if (obj['@ref']) {
      return this.objectMap[obj['@ref']];
    }

    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        obj[key] = this.resolveReferences(obj[key]);
      }
    }

    return obj;
  }
}
