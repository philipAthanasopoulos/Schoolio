export class FolderDTO {
    id: number;
    name: string;
    subFolderIds: number[];
    subFolderNames: string[];
    noteBlobIds: string[];
    noteNames: string[];

    constructor(id: number) {
        this.id = id;
        this.name = '';
        this.subFolderIds = [];
        this.subFolderNames = [];
        this.noteBlobIds = [];
        this.noteNames = [];
    }

    isEmpty(): boolean {
        return ( (this.subFolderIds.length === 0 || !this.subFolderIds) && this.noteBlobIds.length === 0 || !this.noteBlobIds);
    }
}
