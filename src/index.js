import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());

// Cache control middleware
app.use(function (_req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

const baseDir = path.resolve('.');

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

app.use(express.static(path.join(baseDir, 'public')));
app.set('views', path.join(baseDir, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


routes(app);

// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`할일 목록 서비스가 ${PORT}번 포트에서 시작되었습니다!`);
});