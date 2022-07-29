"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ytdl_core_1 = require("ytdl-core");
var electron_1 = require("electron");
var fs = require("fs");
var path = require("path");
var cp = require("child_process");
var dayjs = require('dayjs');
var ffmpeg = require('ffmpeg-static');
var DataModel = require("../database/dataModel");
var YtApi = /** @class */ (function () {
    function YtApi() {
        // Private
        this.processDownload = new Map();
    }
    YtApi.prototype.getInfo = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var prom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prom = new Promise(function (resolve) {
                            (0, ytdl_core_1.getInfo)(url)
                                .then(function (videoInfo) {
                                resolve({
                                    url: videoInfo.videoDetails.video_url,
                                    title: videoInfo.videoDetails.title,
                                    duration: (+videoInfo.videoDetails.lengthSeconds / 60).toFixed(2).toString(),
                                    thumbnail: videoInfo.videoDetails.thumbnails.at(-1).url,
                                    searchDate: dayjs().toString(),
                                    published: videoInfo.videoDetails.viewCount,
                                    author: videoInfo.videoDetails.author.name,
                                });
                            })
                                // @ts-ignore
                                .catch(function (err) { return resolve({ ok: false, message: err }); });
                        });
                        return [4 /*yield*/, Promise.all([prom])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, prom];
                }
            });
        });
    };
    YtApi.prototype.download = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var prom;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prom = new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                            var User, Video_1, config_1, err_1;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 5, , 6]);
                                        return [4 /*yield*/, DataModel.getUserModel()];
                                    case 1:
                                        User = _a.sent();
                                        return [4 /*yield*/, DataModel.getVideoModel()];
                                    case 2:
                                        Video_1 = _a.sent();
                                        return [4 /*yield*/, User.findAll()];
                                    case 3:
                                        config_1 = _a.sent();
                                        return [4 /*yield*/, (0, ytdl_core_1.getInfo)(option.url).then(function (videoInfo) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, Video_1.create({
                                                                title: videoInfo.videoDetails.title,
                                                                url: videoInfo.videoDetails.video_url,
                                                                duration: videoInfo.videoDetails.lengthSeconds,
                                                                savePath: config_1[0].dataValues.savePath,
                                                                thumbnail: videoInfo.videoDetails.thumbnails.at(-1).url,
                                                            })];
                                                        case 1:
                                                            _a.sent();
                                                            return [4 /*yield*/, Video_1.sync({ alter: true })];
                                                        case 2:
                                                            _a.sent();
                                                            if (option.filter === 'highest') {
                                                                resolve({ ok: true, message: 'start download' });
                                                                return [2 /*return*/, this.streamDownload(videoInfo, config_1)];
                                                            }
                                                            (0, ytdl_core_1.downloadFromInfo)(videoInfo, { quality: option.filter })
                                                                .pipe(fs.createWriteStream(path.join(config_1[0].dataValues.savePath, videoInfo.videoDetails.title + ".mp4")));
                                                            resolve({ ok: true, message: 'start download' });
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 4:
                                        _a.sent();
                                        return [3 /*break*/, 6];
                                    case 5:
                                        err_1 = _a.sent();
                                        resolve({ ok: false, message: err_1 });
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all([prom])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, prom];
                }
            });
        });
    };
    YtApi.prototype.getHistory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Video, allVideo, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, DataModel.getVideoModel()];
                    case 1:
                        Video = _a.sent();
                        return [4 /*yield*/, Video.findAll()];
                    case 2:
                        allVideo = _a.sent();
                        return [2 /*return*/, { ok: true, message: allVideo }];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, { ok: false, message: err_2 }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    YtApi.prototype.streamDownload = function (videoInfo, config) {
        return __awaiter(this, void 0, void 0, function () {
            var downloadData_1, audio, video, ffmpegMerge;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    downloadData_1 = {
                        audio: { downloaded: 0, total: 0 },
                        video: { downloaded: 0, total: 0 },
                    };
                    console.log(path.join(config[0].dataValues.savePath, videoInfo.videoDetails.title + ".mkv"));
                    audio = (0, ytdl_core_1.downloadFromInfo)(videoInfo, { quality: 'highestaudio' })
                        .on('progress', function (_, downloaded, total) {
                        downloadData_1.audio = { downloaded: downloaded, total: total };
                    });
                    video = (0, ytdl_core_1.downloadFromInfo)(videoInfo, { quality: 'highestvideo' })
                        .on('progress', function (_, downloaded, total) {
                        downloadData_1.video = { downloaded: downloaded, total: total };
                    });
                    ffmpegMerge = cp.spawn(ffmpeg, [
                        '-loglevel', '8', '-hide_banner',
                        '-progress', 'pipe:3',
                        '-i', 'pipe:4',
                        '-i', 'pipe:5',
                        '-map', '0:a',
                        '-map', '1:v',
                        '-c:v', 'copy',
                        path.join(config[0].dataValues.savePath, videoInfo.videoDetails.channelId + ".mkv"),
                    ], {
                        windowsHide: true,
                        stdio: [
                            'inherit', 'inherit', 'inherit',
                            'pipe', 'pipe', 'pipe',
                        ]
                    });
                    ffmpegMerge.on('close', function () {
                        _this.processDownload.delete(videoInfo.videoDetails.video_url);
                        if (!_this.processDownload.size)
                            electron_1.BrowserWindow.getAllWindows()[0]
                                .webContents.send('getCurrentDownload', []);
                        console.log('done');
                    });
                    ffmpegMerge.stdio[3].on('data', function (chunk) {
                        var linesArr = chunk.toString().trim().split('\n');
                        var args = {};
                        for (var _i = 0, linesArr_1 = linesArr; _i < linesArr_1.length; _i++) {
                            var info = linesArr_1[_i];
                            var _a = info.split('='), key = _a[0], value = _a[1];
                            args[key.trim()] = value;
                        }
                        var totalPercent = {
                            audio: (downloadData_1.audio.downloaded / (downloadData_1.audio.total / 100)).toFixed(2),
                            video: (downloadData_1.video.downloaded / (downloadData_1.video.total / 100)).toFixed(2),
                        };
                        _this.processDownload.set(videoInfo.videoDetails.video_url, { totalPercent: totalPercent, info: videoInfo.videoDetails });
                        electron_1.BrowserWindow.getAllWindows()[0]
                            .webContents.send('getCurrentDownload', Array.from(_this.processDownload.values()));
                    });
                    audio.pipe(ffmpegMerge.stdio[4]);
                    video.pipe(ffmpegMerge.stdio[5]);
                }
                catch (err) {
                    return [2 /*return*/, { ok: false, message: err }];
                }
                return [2 /*return*/];
            });
        });
    };
    return YtApi;
}());
exports.default = new YtApi();
