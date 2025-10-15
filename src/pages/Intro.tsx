import ImagePlaceholder from '../components/ImagePlaceholder';
import ArgonCard from '../components/ArgonCard';
import SectionHeader from '../components/SectionHeader';
import { FaGamepad, FaComments } from 'react-icons/fa';
import '../styles/Intro.css';
import discussionConfig from '../config/discussionConfig.json';
import { getTranslation, getLanguage } from '../i18n/i18nManager';
import { I18nKeys } from '../i18n/TranslationKeys';

function Intro() {
    return (
        <>
        <div className="argon-page">
            <div className="page-container">
                {/* 顶部图片预留区域 */}
                <ImagePlaceholder placeholderText={getTranslation(I18nKeys.Welcome)} />

                {/* 游戏介绍内容 */}
                <div className="content-area">
                    <ArgonCard id="game-intro-card">
                        <SectionHeader title={getTranslation(I18nKeys.ExploreAdventure)} icon={FaGamepad} theme="primary" />
                        <p className="card-text">
                            {getTranslation(I18nKeys.GameIntro)}
                        </p>
                    </ArgonCard>

                    {/* 通关规则部分 */}
                    <ArgonCard id="game-rules-card">
                        <SectionHeader title="通关规则" icon={FaGamepad} theme="primary" />
                        <p className="card-text">
                            {/* 通关规则内容待定，由用户自行定义 */}
                        </p>
                    </ArgonCard>

                    {/* 讨论区域 */}
                    <ArgonCard id="discussion-card">
                        <SectionHeader title={getTranslation(I18nKeys.JoinDiscussion)} icon={FaComments} theme="secondary" />
                        <p className="card-text">
                            {getTranslation(I18nKeys.DiscussionDescription)}
                        </p>
                        <div className="discussion-platform">
                            <script src="https://giscus.app/client.js"
                                data-repo={discussionConfig.repo}
                                data-repo-id={discussionConfig.repoId}
                                data-category={discussionConfig.category}
                                data-category-id={discussionConfig.categoryId}
                                data-mapping="pathname"
                                data-strict="0"
                                data-reactions-enabled="1"
                                data-emit-metadata="0"
                                data-input-position="bottom"
                                data-theme="light"
                                data-lang={getLanguage()}
                                crossOrigin="anonymous"
                                async>
                            </script>
                        </div>
                    </ArgonCard>
                </div>
            </div>
        </div>
        {/* 页脚 */}
        <footer className="page-footer">
            <div className="footer-content">
                <p className="copyright-text">© 2025 游戏世界 版权所有</p>
            </div>
        </footer>
        </>
    );
}

export default Intro;
