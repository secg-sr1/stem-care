import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip,
  Button,
  Divider,
  Paper,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
  Share as ShareIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';

// Import blog data and language context
import blogData from '../data/blogPosts.json';
import { useLanguage } from '../hooks/useLanguage';

export default function BlogPost() {
  const { getLocalizedText } = useLanguage();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const foundPost = blogData.posts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      // Get related posts (excluding current post)
      const related = blogData.posts
        .filter(p => p.id !== foundPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || '';
    const text = post?.excerpt || '';

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (!post) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#0e1a28', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Artículo no encontrado
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4, '& .MuiBreadcrumbs-separator': { color: '#5b5868' } }}>
          <MuiLink component={Link} to="/yoamoamibebe-blog" sx={{ color: '#5b5868', '&:hover': { color: '#5b5868' } }}>
            Blog
          </MuiLink>
          <Typography sx={{ color: '#5b5868' }}>{getLocalizedText(post.title)}</Typography>
        </Breadcrumbs>

        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/yoamoamibebe-blog')}
          sx={{ mb: 4, textTransform: 'none', color: '#5b5868', '&:hover': { color: '#fff', backgroundColor: 'rgba(20, 20, 20, 0.44)' } }}
        >
          Volver al blog
        </Button>

        {/* Main Article Card */}
        <Card 
          sx={{ mb: 6, 
                overflow: 'hidden', 
                borderRadius: 3,
                backgroundColor: 'white', 
                border:1,
                borderColor:'#d2d2d2',
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset",
                transition: "transform .2s ease, box-shadow .2s ease",
                "&:hover": { transform: "translateY(-2px)", boxShadow: "0 16px 40px rgba(0,0,0,0.55)" },
                }}>
          {/* Featured Image */}
          {post.featuredImage && (
            <Box
              component="img"
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              sx={{
                width: '100%',
                height: { xs: 250, md: 400 },
                objectFit: 'cover'
              }}
            />
          )}

          <CardContent sx={{ p: { xs: 3, md: 6 } }}>
            {/* Categories */}
            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              {post.categories.map((category) => (
                <Chip
                  key={category.id}
                  label={getLocalizedText(category.name)}
                  size="small"
                  sx={{
                    backgroundColor: '#5b5868',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.75rem'
                  }}
                />
              ))}
            </Stack>

            {/* Title */}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: '#5b5868',
                lineHeight: 1.2,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              {getLocalizedText(post.title)}
            </Typography>

            {/* Excerpt */}
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 4,
                lineHeight: 1.6,
                fontSize: '1.1rem'
              }}
            >
              {getLocalizedText(post.excerpt)}
            </Typography>

            {/* Author and Meta Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                <Avatar
                  src={post.author.avatar}
                  sx={{ width: 48, height: 48, mr: 2 }}
                >
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {getLocalizedText(post.author.name)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getLocalizedText(post.author.role)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(post.publishedAt)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {post.readingTime}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Article Content */}
            <Box
              sx={{
                '& h2': {
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#5b5868',
                  mb: 2,
                  mt: 4
                },
                '& h3': {
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#5b5868',
                  mb: 1.5,
                  mt: 3
                },
                '& p': {
                  fontSize: '0.85rem',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  color: '#333',
                  mb: 0
                },
                '& ul, & ol': {
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  color: '#333',
                  mb: 2,
                  pl: 3
                },
                '& li': {
                  mb: 0.5
                },
                '& a': {
                  color: '#4fc3f7',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                },
                '& strong': {
                  fontWeight: 700,
                  color: '#1a1a1a'
                }
              }}
              dangerouslySetInnerHTML={{ __html: getLocalizedText(post.content) }}
            />

            {/* Tags */}
            <Box sx={{ mt: 4, mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Etiquetas:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {post.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Share Buttons */}
            {/* <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Compartir este artículo
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  startIcon={<FacebookIcon />}
                  onClick={() => handleShare('facebook')}
                  variant="outlined"
                  sx={{ textTransform: 'none' }}
                >
                  Facebook
                </Button>
                <Button
                  startIcon={<TwitterIcon />}
                  onClick={() => handleShare('twitter')}
                  variant="outlined"
                  sx={{ textTransform: 'none' }}
                >
                  Twitter
                </Button>
                <Button
                  startIcon={<LinkedInIcon />}
                  onClick={() => handleShare('linkedin')}
                  variant="outlined"
                  sx={{ textTransform: 'none' }}
                >
                  LinkedIn
                </Button>
              </Stack>
            </Paper> */}
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            mb: 0,
            textAlign: 'center',
            background: '#fff',
            color: '#5b5868',
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            ¿Tienes preguntas sobre este tema?
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Nuestro asistente de IA está disponible para ayudarte con cualquier consulta
          </Typography>
          <Button
            component="a"
            href="https://www.teravida.org"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#5b5868',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#2a2a2a'
              }
            }}
          >
            Hablar con Teravida AI
          </Button>
        </Paper>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#e8edf6' }}>
              Artículos relacionados
            </Typography>
            <Stack spacing={3}>
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.55)'
                    }
                  }}
                >
                  {relatedPost.featuredImage && (
                    <Box
                      component="img"
                      src={relatedPost.featuredImage.url}
                      alt={relatedPost.featuredImage.alt}
                      sx={{
                        width: { xs: '100%', md: 200 },
                        height: { xs: 200, md: 'auto' },
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  <CardContent sx={{ flex: 1, p: 3 }}>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      {relatedPost.categories.slice(0, 2).map((category) => (
                        <Chip
                          key={category.id}
                          label={getLocalizedText(category.name)}
                          size="small"
                          sx={{
                            backgroundColor: category.color,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.7rem'
                          }}
                        />
                      ))}
                    </Stack>
                    <Typography
                      variant="h6"
                      component={Link}
                      to={`/yoamoamibebe-blog/${relatedPost.slug}`}
                      sx={{
                        fontWeight: 600,
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 1,
                        '&:hover': {
                          color: '#4fc3f7'
                        }
                      }}
                    >
                      {getLocalizedText(relatedPost.title)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 2
                      }}
                    >
                      {getLocalizedText(relatedPost.excerpt)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(relatedPost.publishedAt)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {relatedPost.readingTime}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
