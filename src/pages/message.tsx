import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Collapse } from '@mui/material';

const MessagePage = () => {
  const [open, setOpen] = React.useState(true);

  const handleToggleDocuments = () => {
    setOpen(!open);
  };

  return (
    <Box className="shadow-lg rounded-lg min-h-screen-minus-395 w-5/6 mx-auto my-10">
      {/* Header */}
      <Box className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
        <Box className="font-semibold text-2xl">Messagerie</Box>
        <TextField
          className="w-1/2 bg-gray-100 rounded-2xl"
          variant="outlined"
          placeholder="search message"
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
      {/* Chatting Section */}
      <Box className="flex flex-row justify-between bg-white">
        {/* Chat List */}
        <Box className="flex flex-col w-2/5 border-r-2 overflow-y-auto h-screen-max-395" sx={{ scrollbarWidth: 'thin', scrollbarColor: 'rgb(62, 75, 107) #e0e0e0' }}>
          {/* Search Component fixed at the top */}
          <Box className="sticky top-0 z-10 bg-white border-b-2 py-4 px-2">
            <TextField
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
              variant="outlined"
              placeholder="Rechercher dans les discussions"
            />
          </Box>
          {/* User List */}
          {['Luis1994', 'Everest Trip 2021', 'MERN Stack', 'Javascript Indonesia', 'React Paris', 'Vue Versailles', 'Angular Amiens', 'Svelte Strasbourg', 'Node Nantes', 'Python Paris', 'Ruby Rennes', 'Go Grenoble'].map((user, index) => (
            <Box
              key={index}
              className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
            >
              <Avatar
                src={`https://source.unsplash.com/random/600x600?sig=${index}`}
                className="object-cover h-12 w-12 rounded-full"
              />
              <Box className="w-full">
                <Box className="text-lg font-semibold">{user}</Box>
                <Box className="text-gray-500">Aperçu du dernier message ici</Box>
              </Box>
            </Box>
          ))}
        </Box>
        {/* Message Section */}
        <Box className="w-full px-5 flex flex-col justify-between h-screen-max-395">
          {/* Toggle Document Icon */}
          {!open && (
            <Box className="flex justify-end">
              <IconButton onClick={handleToggleDocuments}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
          )}
          {/* Messages */}
          <Box className="flex flex-col mt-5 overflow-y-auto px-5" sx={{ maxHeight: 'calc(100vh - 200px)', marginBottom: '20px', scrollbarWidth: 'thin', scrollbarColor: 'rgb(62, 75, 107) #e0e0e0' }}>
            {/* Example Sent Message */}
            <Box className="flex justify-end mb-4">
              <Box
                className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
              >
                Welcome to group everyone!
              </Box>
              <Avatar
                src="https://source.unsplash.com/random/600x600?sig=5"
                className="object-cover h-8 w-8 rounded-full"
              />
            </Box>
            {/* Example Received Message */}
            <Box className="flex justify-start mb-4">
              <Avatar
                src="https://source.unsplash.com/random/600x600?sig=6"
                className="object-cover h-8 w-8 rounded-full"
              />
              <Box
                className="ml-2 py-3 px-4 bg-gray-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black"
              >
                Thank you! Happy to be here.
              </Box>
            </Box>
            {/* Additional Messages for Scroll Testing */}
            {Array.from({ length: 20 }, (_, index) => (
              <Box key={index} className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-4`}>
                {index % 2 === 0 ? (
                  <>
                    <Box
                      className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                      Another message from me!
                    </Box>
                    <Avatar
                      src={`https://source.unsplash.com/random/600x600?sig=${index + 7}`}
                      className="object-cover h-8 w-8 rounded-full"
                    />
                  </>
                ) : (
                  <>
                    <Avatar
                      src={`https://source.unsplash.com/random/600x600?sig=${index + 7}`}
                      className="object-cover h-8 w-8 rounded-full"
                    />
                    <Box
                      className="ml-2 py-3 px-4 bg-gray-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black"
                    >
                      Another reply here!
                    </Box>
                  </>
                )}
              </Box>
            ))}
          </Box>
          {/* Message Input */}
          <TextField
            className="w-full py-5 px-3 rounded-xl"
            sx={{ bottom: 10 }}
            variant="outlined"
            placeholder="Ecrire votre message..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* Group Info */}
        <Collapse orientation="horizontal" in={open} collapsedSize="0px">
          <Box className="w-full border-l-2 px-5">
            <Box className="flex flex-col">
              <Box className="font-semibold text-xl py-4 flex items-center justify-between">
                <Box className="flex-grow flex justify-start">
                  Documents <span className="text-blue-500">&nbsp;(1)</span>
                </Box>
                <IconButton onClick={handleToggleDocuments}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Avatar
                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                className="object-cover rounded-xl h-64"
              />
              <Box className="font-semibold py-4">Created 22 Sep 2021</Box>
              <Box className="font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, perspiciatis!
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default MessagePage;
