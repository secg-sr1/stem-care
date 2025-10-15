

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  Stack,
  Avatar,
  Divider,
  Paper,
  IconButton,
  InputBase
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Import blog data and language context
import blogData from '../data/blogPosts.json';
import { useLanguage } from '../hooks/useLanguage';

export default function Blog() {
  const { getLocalizedText } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setPosts(blogData.posts);
    setFilteredPosts(blogData.posts);
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => {
        const title = getLocalizedText(post.title);
        const excerpt = getLocalizedText(post.excerpt);
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
               post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      });
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post =>
        post.categories.some(cat => cat.slug === selectedCategory)
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogCard = ({ post }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderColor:'#d2d2d2',
        borderRadius: 3, 
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: "0 16px 40px rgba(0,0,0,0.55)"
        }
      }}
    >
      {post.featuredImage && (
        <CardMedia
          component="img"
          height="200"
          image={post.featuredImage.url}
          alt={post.featuredImage.alt}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
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

        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: '#5b5868',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {getLocalizedText(post.title)}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6
          }}
        >
          {getLocalizedText(post.excerpt)}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={post.author.avatar}
            sx={{ width: 32, height: 32, mr: 1.5 }}
          >
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#5b5868' }}>
              {getLocalizedText(post.author.name)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {getLocalizedText(post.author.role)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {formatDate(post.publishedAt)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {post.readingTime}
            </Typography>
          </Box>
        </Box>

        <Button
          component={Link}
          to={`/yoamoamibebe-blog/${post.slug}`}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: '#5b5868',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgb(74, 74, 74)',
              borderColor: 'rgb(84, 84, 84)'
            },
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1
          }}
        >
          Leer más
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ffff' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(255, 255, 255) 100%)',
          color: '#5b5868',
          py: 3,
          mb: 0
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            yoamoamibebe Blog
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              fontWeight: 300,
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Descubre todo sobre células madre, pruebas genéticas y medicina regenerativa
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Search and Filter Section */}
        <Paper
          elevation={1}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgb(20, 20, 20)',
                  borderRadius: 2,
                  px: 2,
                  py: 1
                }}
              >
                <SearchIcon sx={{ color: 'rgb(20, 20, 20)', mr: 1 }} />
                <InputBase
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ flex: 1, color: '#000', '&::placeholder': { color: 'rgba(20,20,20,0.7)' } }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label="Todos"
                  onClick={() => setSelectedCategory('all')}
                  variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
                  sx={{
                    backgroundColor: selectedCategory === 'all' ? '#5b5868' : 'transparent',
                    color: selectedCategory === 'all' ? '#fff' : 'rgba(255,255,255,0.8)',
                    borderColor: 'rgba(20,20,20,0.3)'
                  }}
                />
                {blogData.categories.map((category) => (
                  <Chip
                    key={category.id}
                    label={getLocalizedText(category.name)}
                    onClick={() => setSelectedCategory(category.slug)}
                    variant={selectedCategory === category.slug ? 'filled' : 'outlined'}
                    sx={{
                      backgroundColor: selectedCategory === category.slug ? 'rgba(255,255,255,0.2)' : 'transparent',
                      color: selectedCategory === category.slug ? '#000' : 'rgba(20,20,20,0.8)',
                      borderColor: 'rgba(20,20,20,0.3)'
                    }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <Grid container spacing={4}>
            {filteredPosts.map((post) => (
              <Grid item xs={12} md={6} lg={4} key={post.id}>
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No se encontraron artículos
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Intenta con otros términos de búsqueda o categorías
            </Typography>
          </Box>
        )}

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#5b5868' }}>
            ¿Tienes preguntas sobre células madre?
          </Typography>
          <Typography variant="h6" sx={{ mb: 0, maxWidth: '600px', mx: 'auto', color: 'rgba(255,255,255,0.9)' }}>
            Nuestro asistente de IA está disponible 24/7 para ayudarte con cualquier consulta
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
        </Box>
      </Container>
    </Box>
  );
}